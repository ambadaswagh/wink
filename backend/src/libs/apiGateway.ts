import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyWithCognitoAuthorizerEvent,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

import { config } from './config';
import { HttpException, HttpStatusCode } from './http';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedAPIGatewayWithCognitoAuthenticatorProxyEvent<S> = Omit<
  APIGatewayProxyWithCognitoAuthorizerEvent,
  'body'
> & {
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyHandler<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
export type ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<S> = Handler<
  ValidatedAPIGatewayWithCognitoAuthenticatorProxyEvent<S>,
  APIGatewayProxyResult
>;

export const response = <T = Record<string, unknown>>(
  payload: T,
  statusCode = 200
): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': config.domain.host,
  },
  body: payload && JSON.stringify(payload),
});

const response5xx = (err: Error, statusCode: number) => {
  console.error(err);
  return response({ message: 'An unexpected error has happened!' }, statusCode);
};

export const errorResponse = (err: Error): APIGatewayProxyResult => {
  if (err instanceof HttpException) {
    const httpEx = err as HttpException;

    if (httpEx.httpStatusCode >= 500) {
      return response5xx(err, httpEx.httpStatusCode);
    }

    console.info(`HttpException: ${httpEx.httpStatusCode} - ${httpEx.message}`);
    return response({ message: httpEx.message }, httpEx.httpStatusCode);
  }
  return response5xx(err, HttpStatusCode.INTERNAL_SERVER_ERROR);
};
