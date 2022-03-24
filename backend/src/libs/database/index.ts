import AWS from 'aws-sdk';

import { batchGet } from './batchGet';
import { batchWrite } from './batchWrite';
import { deleteItem } from './delete';
import { get } from './get';
import { put } from './put';
import { query } from './query';
import { scan } from './scan';
import { transactGet } from './transactGet';
import { transactWrite } from './transactWrite';
import { update } from './update';

export const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const awsPromise = <T>(p: Promise<PromiseResult<T, AWS.AWSError>>): DynamoDBPromise<T> =>
  p
    .then((res) =>
      res.$response.error
        ? { error: res.$response.error }
        : {
            data: res.$response.data ?? undefined, // convert void to undefined 🙄
          }
    )
    .catch((error: AWS.AWSError) => ({ error }));

type PromiseResult<D, E> = D & { $response: AWS.Response<D, E> };
export type DynamoDBResult<T> = DynamoDBResultSuccess<T> | DynamoDBResultError;
export interface DynamoDBResultSuccess<T> {
  data: T | undefined;
}
export interface DynamoDBResultError {
  error: AWS.AWSError;
}
export type DynamoDBPromise<T> = Promise<DynamoDBResult<T>>;
export type FinalResponse<T> = Promise<T | DynamoDBResultError>;

const db = {
  batchGet,
  batchWrite,
  delete: deleteItem,
  get,
  put,
  query,
  scan,
  transactGet,
  transactWrite,
  update,
};

export default db;
