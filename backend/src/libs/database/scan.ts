import { awsPromise, ddb, DynamoDBResultSuccess, FinalResponse } from '.';

export const scan = async <T>(
  params: AWS.DynamoDB.DocumentClient.ScanInput
): FinalResponse<ScanOutputT<T>> => {
  const res = await awsPromise(ddb.scan(params).promise());
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
export interface ScanOutputT<T extends AWS.DynamoDB.DocumentClient.AttributeMap>
  extends DynamoDBResultSuccess<AWS.DynamoDB.DocumentClient.ScanOutput> {
  data: {
    Items: T[];
    Count?: number;
    ScannedCount?: number;
    LastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
  };
}
