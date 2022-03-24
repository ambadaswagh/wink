import { awsPromise, ddb, DynamoDBResult } from '.';

export const deleteItem = async (
  params: AWS.DynamoDB.DocumentClient.DeleteItemInput
): Promise<DynamoDBResult<AWS.DynamoDB.DocumentClient.DeleteItemOutput>> =>
  awsPromise(ddb.delete(params).promise());
