import 'source-map-support/register';

import adapters from '@libs/adapters';
import { response } from '@libs/apiGateway';
import db from '@libs/database';
import { layerApi } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';
import type { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event) => {
  const servicePointId = event.pathParameters?.id;
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

  const servicePoint = config.data.Responses.ServicePoint[0] as ServicePointRow;
  const serviceLocation = config.data.Responses.ServiceLocation[0] as ServiceLocationRow;

  const { name, merchantId, posSystemId, currencyId, contact, servicePointDenomination } =
    serviceLocation;

  const adapter = adapters[posSystemId];
  if (!adapter) {
    return response({ message: `Invalid POS ${posSystemId}` }, 500);
  }
  const { getCapabilities, getOrder } = adapter;
  const posCapabilities = await getCapabilities({ serviceLocation, servicePoint });
  if ('error' in posCapabilities) {
    return response({ message: posCapabilities.error });
  }

  const order = await getOrder({ serviceLocation, servicePoint });

  const data: ApiGetOrderResponse = {
    message: 'OK',
    stripeAccountId: serviceLocation.stripeAccount?.accountId,
    servicePoint: {
      name: servicePoint.name,
      servicePointId: servicePoint.servicePointId,
    },
    serviceLocation: {
      serviceLocationId,
      merchantId,
      currencyId,
      name,
      contact,
      servicePointDenomination,
    },
    order,
    posCapabilities,
  };
  return response(data);
};

export const main: MiddyfiedHandler = layerApi(handler);
