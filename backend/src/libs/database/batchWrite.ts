import { awsPromise, ddb, DynamoDBResult } from '.';

export const batchWrite = async (
  params: AWS.DynamoDB.DocumentClient.BatchWriteItemInput
): Promise<DynamoDBResult<AWS.DynamoDB.DocumentClient.BatchWriteItemOutput>> =>
  awsPromise(ddb.batchWrite(params).promise());
