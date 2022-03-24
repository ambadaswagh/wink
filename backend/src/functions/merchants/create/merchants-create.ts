import 'source-map-support/register';

import {
  response,
  ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler,
} from '@libs/apiGateway';
import db from '@libs/database';
import { genMerchantId, genServiceLocationId } from '@libs/domain';
import { HttpException } from '@libs/http';
import { getUser } from '@libs/identity';
import { layerApiWithBody } from '@libs/lambda';
import { validateLocale } from '@libs/locales';
import { MiddyfiedHandler } from '@middy/core';

import schema from './schema';

const handler: ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<typeof schema> = async (
  event
) => {
  const merchant = event.body.merchant;
  const user = getUser(event.requestContext.authorizer);
  const userId = user.userId;
  const merchantId = genMerchantId();
  const newMerchant: MerchantRow = Object.assign(merchant, {
    merchantId,
    status: MerchantStatus.WAITLIST,
    defaultLocale: validateLocale(merchant.defaultLocale),
    createdTs: Date.now() / 1000,
    createdIp: event.requestContext.identity.sourceIp,
  });
  const newServiceLocation: ServiceLocationRow = {
    serviceLocationId: genServiceLocationId(),
    merchantId,
    name: merchant.name,
    contact: merchant.contact,
    currencyId: merchant.currencyId,
    servicePointDenomination: merchant.servicePointDenomination,
    posSystemId: '',
    posParameters: {},
  };

  const userRow = await db.get<MerchantUserRow>({
    TableName: 'User',
    Key: {
      userId,
    },
  });
  if ('error' in userRow) throw new HttpException(userRow.error.message);

  const userUpdateInstructions = userRow.data.Item
    ? {
        Update: {
          TableName: 'User',
          Key: { userId },
          UpdateExpression: 'SET merchants = :merchants',
          ExpressionAttributeValues: {
            ':merchants': userRow.data.Item.merchants.concat({
              merchantId,
              serviceLocations: null,
              roles: ['ADMIN'],
            }),
          },
        },
      }
    : {
        Put: {
          TableName: 'User',
          Item: createUser(user, merchantId),
        },
      };

  const ok = await db.transactWrite({
    TransactItems: [
      userUpdateInstructions,
      {
        Put: {
          TableName: 'Merchant',
          Item: newMerchant,
        },
      },
      {
        Put: {
          TableName: 'ServiceLocation',
          Item: newServiceLocation,
        },
      },
    ],
  });
  // istanbul ignore next
  if ('error' in ok) throw new HttpException(ok.error.message);

  return response({ message: 'OK' });
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, schema);

const createUser = (user: AuthorizedUser, merchantId: string): MerchantUserRow => ({
  userId: user.userId,
  name: user.name,
  email: user.email,
  merchants: [
    {
      merchantId,
      serviceLocations: null,
      roles: ['ADMIN'],
    },
  ],
  roles: [],
});

enum MerchantStatus {
  WAITLIST = 'WAITLIST',
}
