import { APIGatewayProxyCognitoAuthorizer } from 'aws-lambda';

import db from './database';
import { HttpException, HttpStatusCode } from './http';
import { getUser, getUserAccess } from './identity';

export const authorizeUser = async (
  authorizer: APIGatewayProxyCognitoAuthorizer
): Promise<MerchantUserRow> => {
  const user = getUser(authorizer);

  const getResponse = await getUserAccess(user.userId);
  // istanbul ignore next
  if ('error' in getResponse) {
    throw new HttpException(getResponse.error.message, HttpStatusCode.UNAUTHORIZED);
  }

  if (!getResponse.data.Item) {
    throw new HttpException('User not found!', HttpStatusCode.UNAUTHORIZED);
  }

  return getResponse.data.Item;
};

export const getUserRolesForServiceLocation = async (
  merchantUser: MerchantUserRow,
  serviceLocationId: string
): Promise<MerchantUserRole[]> => {
  if (merchantUser.roles.includes('ADMIN')) return ['ADMIN'];

  const serviceLocation = await db.get<ServiceLocation>({
    TableName: 'ServiceLocation',
    Key: { serviceLocationId },
    ProjectionExpression: 'merchantId',
  });
  if ('error' in serviceLocation) throw new HttpException(serviceLocation.error.message);

  const merchantId = serviceLocation.data.Item?.merchantId;
  if (!merchantId) throw new HttpException('Service Location not found', HttpStatusCode.NOT_FOUND);

  const merchantAccess = merchantUser.merchants.find((m) => m.merchantId === merchantId);
  const serviceLocationAccess = merchantAccess?.serviceLocations?.find(
    (l) => l.serviceLocationId === serviceLocationId
  );

  const roles = [
    ...merchantUser.roles,
    ...(merchantAccess?.roles || []),
    ...(serviceLocationAccess?.roles || []),
  ];
  return roles.includes('ADMIN') ? ['ADMIN'] : roles;
};
