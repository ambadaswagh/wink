import 'source-map-support/register';

import { StripeAccountConnectBodySchema } from '@functions/bill/create/schema';
import {
  errorResponse,
  response,
  ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler,
} from '@libs/apiGateway';
import stripeClient from '@libs/clients/stripe';
import { HttpException, HttpStatusCode } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import merchantRepo from '@libs/repositories/merchant';
import { MiddyfiedHandler } from '@middy/core';

import { getMerchantForEvent } from '../../utils';

const createStripeExpressAccount = async (merchant: MerchantRow): Promise<string> => {
  console.log('Creating express account');

  const createResponse = await stripeClient.createExpressAccount();
  const stripeAccountId = createResponse.id;

  console.log(`Updating merchant record with stripe account: ${stripeAccountId}`);
  await merchantRepo.updateMerchant({
    ...merchant,
    stripeAccount: {
      accountId: stripeAccountId,
      creationTs: Date.now() / 1000,
      activationStatus: 'PENDING',
    },
  });

  return stripeAccountId;
};

const handler: ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<
  typeof StripeAccountConnectBodySchema
> = async (event) => {
  try {
    const { merchantId } = event.body;
    const merchant = await getMerchantForEvent(event.requestContext.authorizer, merchantId);
    const { stripeAccount } = merchant;

    if (stripeAccount && stripeAccount.activationStatus === 'ACTIVE') {
      throw new HttpException(
        `You already have a Stripe account (${stripeAccount.accountId}) connected to this merchant '${merchantId}'`,
        HttpStatusCode.CONFLICT
      );
    }

    const stripeAccountId =
      stripeAccount?.accountId || (await createStripeExpressAccount(merchant));

    const { url } = await stripeClient.createAccountOnboardingLink(stripeAccountId, merchantId);

    return response({ accountActivationLink: url }, HttpStatusCode.CREATED);
  } catch (err) {
    return errorResponse(err as Error);
  }
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, StripeAccountConnectBodySchema);
