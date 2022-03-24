import middy from '@middy/core';
import middyHttpError from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import middyValidator from '@middy/validator';
import type {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  APIGatewayProxyWithCognitoAuthorizerEvent,
  APIGatewayProxyWithCognitoAuthorizerHandler,
} from 'aws-lambda';

import type {
  ValidatedAPIGatewayWithCognitoAuthenticatorProxyEvent,
  ValidatedEventAPIGatewayProxyHandler,
  ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler,
} from './apiGateway';

export const layerApiWithBody = <T>(
  handler: ValidatedHandler<T>,
  schema: T
): middy.MiddyfiedHandler<
  ValidatedAPIGatewayWithCognitoAuthenticatorProxyEvent<T>,
  APIGatewayProxyResult,
  Error
> =>
  middy(handler)
    .use(middyJsonBodyParser())
    .use(
      middyValidator({
        inputSchema: {
          type: 'object',
          properties: {
            body: {
              ...schema,
              additionalProperties: false,
            },
          },
          required: ['body'],
        },
      })
    )
    .use(middyHttpError());

export const layerApi = (
  handler: FunctionHandler
): middy.MiddyfiedHandler<
  APIGatewayProxyWithCognitoAuthorizerEvent,
  APIGatewayProxyResult,
  Error
> => middy(handler).use(middyHttpError());

type FunctionHandler = APIGatewayProxyHandler | APIGatewayProxyWithCognitoAuthorizerHandler;
type ValidatedHandler<T> =
  | ValidatedEventAPIGatewayProxyHandler<T>
  | ValidatedEventAPIGatewayWithCognitoAuthenticatorProxyHandler<T>;
