import db from '../database';
import { serviceLocationRowToObject } from './serviceLocation';

export const merchantRowToObject = async (row: MerchantRow): Promise<Merchant> => {
  const rs = await db.query<ServiceLocationRow>({
    TableName: 'ServiceLocation',
    IndexName: 'merchantIdIdx',
    KeyConditionExpression: 'merchantId = :merchantId',
    ExpressionAttributeValues: {
      ':merchantId': row.merchantId,
    },
  });
  if ('error' in rs) throw Error(rs.error.message);
  const serviceLocationsRows = rs.data.Items;

  return {
    merchantId: row.merchantId,
    name: row.name,
    status: row.status,
    contact: row.contact,
    defaultLocale: row.defaultLocale,
    currencyId: row.currencyId,
    stripeAccount: row.stripeAccount,
    enabledPaymentTypes: row.enabledPaymentTypes,
    servicePointDenomination: row.servicePointDenomination,
    serviceLocations: await Promise.all(serviceLocationsRows.map(serviceLocationRowToObject)),
  };
};
