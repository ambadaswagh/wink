import { awsPromise, ddb, DynamoDBResult } from '.';

export const update = async (
  params: AWS.DynamoDB.DocumentClient.UpdateItemInput
): Promise<DynamoDBResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput>> =>
  awsPromise(ddb.update(params).promise());
