import db from '../database';

export const serviceLocationRowToObject = async (
  row: ServiceLocationRow
): Promise<ServiceLocation> => {
  const rs = await db.query<ServicePointRow>({
    TableName: 'ServicePoint',
    IndexName: 'serviceLocationIdIdx',
    KeyConditionExpression: 'serviceLocationId = :serviceLocationId',
    ExpressionAttributeValues: {
      ':serviceLocationId': row.serviceLocationId,
    },
  });
  if ('error' in rs) throw Error(rs.error.message);
  const servicePointRows = rs.data.Items;

  return {
    serviceLocationId: row.serviceLocationId,
    merchantId: row.merchantId,
    name: row.name,
    contact: row.contact,
    currencyId: row.currencyId,
    posSystemId: row.posSystemId,
    posParameters: row.posParameters,
    servicePointDenomination: row.servicePointDenomination,
    stripeAccount: row.stripeAccount,
    servicePoints: servicePointRows,
  };
};
