import db from '@libs/database';
import { GetItemOutputT } from '@libs/database/get';

import { callDdb } from './utils';

const TableName = 'Merchant';

class MerchantRepo {
  readonly updateMerchant = async (merchant: MerchantRow): Promise<void> => {
    await callDdb(() =>
      db.put({
        TableName,
        Item: merchant,
      })
    );

    const rs = await callDdb(() =>
      db.query<ServiceLocationRow>({
        TableName: 'ServiceLocation',
        IndexName: 'merchantIdIdx',
        KeyConditionExpression: 'merchantId = :merchantId',
        ExpressionAttributeValues: { ':merchantId': merchant.merchantId },
      })
    );
    if ('error' in rs) throw Error('Assertion');

    const serviceLocations = rs.data.Items;
    if (serviceLocations.length) {
      const updateObject = {
        stripeAccount: merchant.stripeAccount,
        currencyId: merchant.currencyId,
      };

      // TODO: If # of service locations is > 25, we have to loop this operation
      await callDdb(() =>
        db.batchWrite({
          RequestItems: {
            ServiceLocation: serviceLocations.map((l) => ({
              PutRequest: {
                Item: Object.assign(l, updateObject),
              },
            })),
          },
        })
      );
    }
  };

  readonly getMerchant = async (merchantId: string): Promise<MerchantRow | undefined> => {
    const getResponse = (await callDdb(() =>
      db.get<MerchantRow>({
        TableName,
        Key: {
          merchantId,
        },
      })
    )) as GetItemOutputT<MerchantRow>;

    return getResponse.data?.Item;
  };
}

export default new MerchantRepo();
