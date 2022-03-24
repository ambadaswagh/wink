import { response, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import StripeClient from '@libs/clients/stripe';
import db from '@libs/database';
import { genCheckoutTransactionId } from '@libs/domain';
import { Env, env } from '@libs/env';
import { HttpException } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import { comparePrice, computeOrderTotal } from '@libs/orderUtils';
import checkoutTransactionRepo from '@libs/repositories/checkoutTransaction';
import { MiddyfiedHandler } from '@middy/core';

import adapters from '../../../adapters';
import { BillUpdateBodySchema } from './schema';

const handler: ValidatedEventAPIGatewayProxyHandler<typeof BillUpdateBodySchema> = async (
  event
) => {
  const body: ApiPostBillUpdateBody = event.body;
  const userId = event.queryStringParameters?.userId;
  const { order, settlementRequest, processorTransactionId } = body;
  const { items, tipAmount } = settlementRequest;

  if (!processorTransactionId) {
    return response({ message: 'Missing processorTransactionId' }, 400);
  }

  const skipPaymentVerification = processorTransactionId.startsWith('test') && env === Env.Dev;
  if (!skipPaymentVerification) {
    const repeatTransaction = await checkoutTransactionRepo.getCheckoutTransaction(
      'Stripe',
      processorTransactionId
    );
    if (repeatTransaction === null) {
      // TODO: this situation must be treated differently by the front-end... we can't say the
      // payment did not go through, but we can't say either that it worked. In this case the
      // message to the user will have to be that Wink had an error, to ask assistance of the
      // waiter, and that if the payment went through they will have to contact us for a refund.
      // In any event, we should have a daily reconciliation process that refunds any transactions
      // that are on the payment processor but is not in our database.
      // We should probably also retry this DynamoDB query a couple of times with a delay between
      // them.
      return response({ message: 'UNDEFINED OUTCOME' }, 500);
    }

    if (repeatTransaction) {
      // All good, this is just a retransmission
      return response({
        message: 'OK',
        settlementResponse: {
          checkoutTransactionId: repeatTransaction.checkoutTransactionId,
          receiptUrl: repeatTransaction.receiptUrl,
          transactionId: repeatTransaction.posTransaction,
        },
      });
    }
  }

  const servicePointId = order.servicePointId;
  if (!servicePointId) {
    return response({ message: 'Missing servicePointId' }, 400);
  }
  const serviceLocationId = servicePointId.substring(0, 24);

  const config = await db.batchGet({
    RequestItems: {
      ServicePoint: {
        Keys: [{ servicePointId }],
      },
      ServiceLocation: {
        Keys: [{ serviceLocationId }],
      },
    },
  });
  // istanbul ignore next
  if ('error' in config) {
    return response({ message: config.error.message }, 500);
  }

  const servicePointRow = config.data.Responses.ServicePoint[0] as ServicePointRow;
  const serviceLocation = config.data.Responses.ServiceLocation[0] as ServiceLocationRow;
  if (!serviceLocation) throw new HttpException('Service Location not found');
  if (!servicePointRow) throw new HttpException('Service Point not found');
  const stripeAccount = serviceLocation.stripeAccount?.accountId;
  if (!stripeAccount) {
    return response({ message: 'PROCESSOR_NOT_ACTIVE' }, 400);
  }

  const selectedItems = order.items
    .filter((i) => items.some((selection) => selection.orderItemId === i.orderItemId))
    .map((i) => {
      const selection = items.find((s) => s.orderItemId === i.orderItemId);
      if (!selection) throw Error('Assertion');
      const quantity = selection.quantity;
      return Object.assign({}, i, { quantity });
    });

  if (!skipPaymentVerification) {
    const paidOrder = await StripeClient.getCheckoutSession(stripeAccount, processorTransactionId);
    if (!paidOrder) {
      return response({ message: 'NOTFOUND' }, 404);
    }
    const match =
      order.servicePointId === paidOrder.servicePointId &&
      order.waiter === paidOrder.waiter &&
      selectedItems.every((i, idx) => {
        const p = paidOrder.items[idx];
        return (
          i.description === p.description &&
          i.quantity === p.quantity &&
          comparePrice(i.unitPrice, p.unitPrice)
        );
      });
    if (!match) {
      return response({ message: 'MISMATCH' }, 400);
    }
  }

  const { posSystemId } = serviceLocation;

  const updateOrder = adapters[posSystemId]?.updateOrder;
  if (!updateOrder) {
    return response({ message: `Invalid POS ${posSystemId}` }, 500);
  }
  const settlementResponse = await updateOrder({
    serviceLocation,
    servicePoint: servicePointRow,
    tipAmount,
    items: selectedItems,
  });

  if (settlementResponse.error) {
    // TODO: Generate refund to customer
    return response({ message: settlementResponse.error });
  }

  const checkoutTransactionId = genCheckoutTransactionId();
  await checkoutTransactionRepo.createCheckoutTransaction({
    checkoutTransactionId,
    paymentProcessor: 'Stripe',
    processorTransactionId,
    serviceLocationId,
    servicePointId,
    merchantId: serviceLocation.merchantId,
    paymentTs: Date.now() / 1000,
    receiptUrl: settlementResponse.receiptUrl,
    posTransaction: settlementResponse.transactionId,
    waiter: order.waiter,
    totalPrice: computeOrderTotal(order.items),
    items: selectedItems.map(({ orderItemId, description, quantity, unitPrice, modifiers }) => ({
      orderItemId,
      description,
      quantity,
      unitPrice,
      modifiers: modifiers.map((modifier) => ({
        orderItemId: modifier.orderItemId,
        description: modifier.description,
        quantity: modifier.quantity,
        unitPrice: modifier.unitPrice,
      })),
    })),
    userId,
  });

  const data: ApiBillUpdateResponse = {
    message: 'OK',
    settlementResponse,
    checkoutTransactionId,
  };
  return response(data);
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, BillUpdateBodySchema);
