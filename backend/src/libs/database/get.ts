import { awsPromise, ddb, DynamoDBResultSuccess, FinalResponse } from '.';

export const get = async <T>(
  params: AWS.DynamoDB.DocumentClient.GetItemInput
): FinalResponse<GetItemOutputT<T>> => {
  const res = await awsPromise(ddb.get(params).promise());
  return 'error' in res
    ? res
    : {
        data: {
          Item: res.data?.Item as T | undefined,
        },
      };
};
export interface GetItemOutputT<T extends AWS.DynamoDB.DocumentClient.AttributeMap>
  extends DynamoDBResultSuccess<AWS.DynamoDB.DocumentClient.GetItemOutput> {
  data: {
    Item: T | undefined;
  };
}
