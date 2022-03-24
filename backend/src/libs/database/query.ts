import { awsPromise, ddb, DynamoDBResultSuccess, FinalResponse } from '.';

export const query = async <T>(
  params: AWS.DynamoDB.DocumentClient.QueryInput
): FinalResponse<QueryOutputT<T>> => {
  const res = await awsPromise(ddb.query(params).promise());
  return 'error' in res
    ? res
    : {
        data: {
          Items: (res.data?.Items as T[]) || [],
          Count: res.data?.Count,
          ScannedCount: res.data?.ScannedCount,
          LastEvaluatedKey: res.data?.LastEvaluatedKey,
        },
      };
};
export interface QueryOutputT<T extends AWS.DynamoDB.DocumentClient.AttributeMap>
  extends DynamoDBResultSuccess<AWS.DynamoDB.DocumentClient.QueryOutput> {
  data: {
    Items: T[];
    Count?: number;
    ScannedCount?: number;
    LastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
  };
}
