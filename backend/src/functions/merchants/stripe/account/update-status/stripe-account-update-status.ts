import { StripeAccountUpdateBodySchema } from '@functions/bill/create/schema';
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

const handler: ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<
  typeof StripeAccountUpdateBodySchema
> = async (event) => {
  try {
    const { merchantId } = event.body;
    const merchant = await getMerchantForEvent(event.requestContext.authorizer, merchantId);
    const { stripeAccount } = merchant;

    if (!stripeAccount) {
      throw new HttpException(
        `No Stripe account found for the merchant ${merchantId}`,
        HttpStatusCode.NOT_FOUND
      );
    }

    if (stripeAccount.activationStatus === 'ACTIVE') {
      return response(undefined, HttpStatusCode.NO_CONTENT);
    }

    const account = await stripeClient.retrieveAccount(stripeAccount.accountId);

    // why `isAccountActive = account.charges_enabled`?
    // see https://stripe.com/docs/connect/express-accounts#handle-users-not-completed-onboarding
    const isAccountActive = account.charges_enabled;

    if (isAccountActive) {
      await merchantRepo.updateMerchant({
        ...merchant,
        stripeAccount: {
          ...stripeAccount,
          activationStatus: 'ACTIVE',
          activationTs: Date.now() / 1000,
        },
      });
    }

    return response(undefined, HttpStatusCode.NO_CONTENT);
  } catch (err) {
    return errorResponse(err as Error);
  }
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, StripeAccountUpdateBodySchema);
