import 'source-map-support/register';

import { response } from '@libs/apiGateway';
import db from '@libs/database';
import { getUser, getUserAccess } from '@libs/identity';
import { layerApi } from '@libs/lambda';
import { merchantRowToObject } from '@libs/schemaMappers/merchant';
import { MiddyfiedHandler } from '@middy/core';
import type { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';

const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (event) => {
  try {
    const authorizedUser = getUser(event.requestContext.authorizer);
    const userId = authorizedUser.userId;

    const access = await getUserAccess(userId);
    // istanbul ignore next
    if ('error' in access) {
      return response({ message: access.error.message });
    }

    const merchantUser = access.data.Item;
    if (!merchantUser) {
      // Let's create this user
      const user: MerchantUser = {
        userId,
        name: authorizedUser.name,
        email: authorizedUser.email,
        roles: [],
        merchants: [],
      };
      db.put({
        TableName: 'User',
        Item: user,
      });

      return response({ message: 'OK', merchantUser: user, merchants: [] });
    }

    const merchants = merchantUser.roles.length
      ? await getAllMerchants() // admin
      : await getMerchants(merchantUser.merchants.map((m) => m.merchantId)); // regular user

    const data: ApiGetMerchantDashboard = {
      message: 'OK',
      merchantUser,
      merchants,
      availableCountries: [],
      availableCurrencies: [],
    };
    return response(data);
  } catch (err) {
    return response({ message: err.message }, 500);
  }
};

const getMerchants = async (merchantIds: string[]): Promise<Merchant[]> => {
  if (!merchantIds.length) return [];
  const rs = await db.batchGet<MerchantRow>({
    RequestItems: {
      Merchant: {
        Keys: merchantIds.map((merchantId) => ({ merchantId })),
      },
    },
  });
  if ('error' in rs) throw Error(rs.error.message);
  return Promise.all(Object.values(rs.data.Responses).flat().map(merchantRowToObject));
};

const getAllMerchants = async (): Promise<Merchant[]> => {
  // TODO: implement pagination with ExclusiveStartKey

  const rs = await db.scan<MerchantRow>({
    TableName: 'Merchant',
  });
  if ('error' in rs) throw Error(rs.error.message);

  const rsSl = await db.scan<ServiceLocationRow>({
    TableName: 'ServiceLocation',
    ProjectionExpression: [
      // excluding mainly posData from resultset
      'serviceLocationId',
      'merchantId',
      'name',
      'contact',
      'servicePointDenomination',
      'posSystemId',
      'posParameters',
    ].join(','),
  });
  if ('error' in rsSl) throw Error(rsSl.error.message);

  const rsSp = await db.scan<ServicePointRow>({
    TableName: 'ServicePoint',
  });
  if ('error' in rsSp) throw Error(rsSp.error.message);

  return rs.data.Items.map((m) => ({
    ...m,
    serviceLocations: rsSl.data.Items.filter((sl) => sl.merchantId === m.merchantId)
      .map((sl) => ({
        ...sl,
        servicePoints: rsSp.data.Items.filter((sp) =>
          sp.servicePointId.startsWith(sl.serviceLocationId)
        ).sort((a, b) =>
          Number(a.name) && Number(b.name)
            ? Number(a.name) - Number(b.name)
            : a.name.localeCompare(b.name)
        ),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));
};

export const main: MiddyfiedHandler = layerApi(handler);
