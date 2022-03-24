import 'source-map-support/register';

import {
  response,
  ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler,
} from '@libs/apiGateway';
import { authorizeUser, getUserRolesForServiceLocation } from '@libs/auth';
import db from '@libs/database';
import { genServicePointSuffix } from '@libs/domain';
import { HttpException, HttpStatusCode } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';

import schema from './schema';

const handler: ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<typeof schema> = async (
  event
) => {
  const serviceLocationId = event.body.serviceLocationId;
  const servicePoints = event.body.servicePoints;

  const merchantUser = await authorizeUser(event.requestContext.authorizer);

  const roles = await getUserRolesForServiceLocation(merchantUser, serviceLocationId);

  if (!roles.includes('ADMIN') && !roles.includes('OPERATIONS')) {
    throw new HttpException('User does not have sufficient privileges', HttpStatusCode.FORBIDDEN);
  }

  while (servicePoints.length) {
    const batch = servicePoints.splice(0, 25);
    const ok = await db.batchWrite({
      RequestItems: {
        ServicePoint: batch.map((p) => ({
          PutRequest: {
            Item: {
              servicePointId: serviceLocationId + genServicePointSuffix(),
              serviceLocationId,
              ...p,
            },
          },
        })),
      },
    });
    // istanbul ignore next
    if ('error' in ok) throw new HttpException(ok.error.message);
  }

  return response({ message: 'OK' });
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, schema);
