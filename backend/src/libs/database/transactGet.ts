import { awsPromise, ddb, DynamoDBResultSuccess, FinalResponse } from '.';

export const transactGet = async <T>(
  params: AWS.DynamoDB.DocumentClient.TransactGetItemsInput
): FinalResponse<TransactGetOutputT<T>> => {
  const res = await awsPromise(ddb.transactGet(params).promise());
  return 'error' in res
    ? res
    : {
        data: {
          Responses: res.data?.Responses?.map((r) => ({ Item: r.Item as T })) || [],
        },
      };
};
export interface TransactGetOutputT<T extends AWS.DynamoDB.DocumentClient.AttributeMap>
  extends DynamoDBResultSuccess<AWS.DynamoDB.DocumentClient.TransactGetItemsOutput> {
  data: {
    Responses: { Item: T }[];
  };
}
