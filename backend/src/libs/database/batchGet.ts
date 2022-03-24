import { awsPromise, ddb, DynamoDBResultSuccess, FinalResponse } from '.';

export const batchGet = async <T>(
  params: AWS.DynamoDB.DocumentClient.BatchGetItemInput
): FinalResponse<BatchGetItemOutputT<T>> => {
  const res = await awsPromise(ddb.batchGet(params).promise());
  return 'error' in res
    ? res
    : {
        data: {
          Responses: (res.data?.Responses as Record<string, T[]>) || {},
          UnprocessedKeys: res.data?.UnprocessedKeys,
        },
      };
};
export interface BatchGetItemOutputT<T extends AWS.DynamoDB.DocumentClient.AttributeMap>
  extends DynamoDBResultSuccess<AWS.DynamoDB.DocumentClient.BatchGetItemOutput> {
  data: {
    Responses: Record<string, T[]>;
    UnprocessedKeys?: AWS.DynamoDB.DocumentClient.BatchGetRequestMap;
  };
}
