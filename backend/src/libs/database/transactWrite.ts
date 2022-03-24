import { awsPromise, ddb, DynamoDBResult } from '.';

export const transactWrite = async (
  params: AWS.DynamoDB.DocumentClient.TransactWriteItemsInput
): Promise<DynamoDBResult<AWS.DynamoDB.DocumentClient.TransactWriteItemsOutput>> =>
  awsPromise(ddb.transactWrite(params).promise());
