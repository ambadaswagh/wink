import { awsPromise, ddb, DynamoDBResult } from '.';

export const put = async (
  params: AWS.DynamoDB.DocumentClient.PutItemInput
): Promise<DynamoDBResult<AWS.DynamoDB.DocumentClient.PutItemOutput>> =>
  awsPromise(ddb.put(params).promise());
