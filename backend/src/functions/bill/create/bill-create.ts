import { errorResponse, response, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import stripeClient from '@libs/clients/stripe';
import { HttpException, HttpStatusCode } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import merchantRepo from '@libs/repositories/merchant';
import { MiddyfiedHandler } from '@middy/core';

import { BillCreateBodySchema } from './schema';

const handler: ValidatedEventAPIGatewayProxyHandler<typeof BillCreateBodySchema> = async (
  event
) => {
  try {
    const body: ApiPostBillCreateBody = event.body;
    const { userId, merchantId, order, settlementRequest, locale } = body;
    const servicePointId = order.servicePointId;
    const { items, tipAmount } = settlementRequest;

    const merchant = await merchantRepo.getMerchant(merchantId);

    if (!merchant) {
      throw new HttpException(`Merchant ${merchantId} doesn't exist!`, HttpStatusCode.NOT_FOUND);
    }

    if (!merchant.stripeAccount) {
      throw new HttpException(
        `Merchant ${merchantId} doesn't have a Stripe account!`,
        HttpStatusCode.BAD_REQUEST
      );
    }

    if (merchant.stripeAccount.activationStatus !== 'ACTIVE') {
      throw new HttpException(
        `Merchant's (${merchantId}) Stripe account is not active!`,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const lineItems = order.items
      .filter((i) => items.some((selected) => selected.orderItemId === i.orderItemId))
      .map((i) => {
        const selection = items.find((selected) => selected.orderItemId === i.orderItemId);
        if (!selection) throw Error('Assertion');
        return {
          description: i.description,
          quantity: selection.quantity,
          unitPrice: i.unitPrice,
        };
      });
    if (tipAmount) {
      lineItems.push({
        description: 'Trinkgeld',
        quantity: 1,
        unitPrice: tipAmount,
      });
    }

    const session = await stripeClient.createCheckoutSession({
      userId,
      merchantId,
      servicePointId,
      waiter: order.waiter,
      locale,
      stripeAccountId: merchant.stripeAccount.accountId,
      items: lineItems,
    });

    const data: ApiPostBillCreate = {
      message: 'ok',
      processorTransactionId: session.id,
    };
    return response(data);
  } catch (err) {
    return errorResponse(err as Error);
  }
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, BillCreateBodySchema);
