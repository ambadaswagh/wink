import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import { response } from '@libs/apiGateway';
import { layerApiWithBody } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';

// schema is imported here and also in the template, so it should always have this name
import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  return response({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

// `main` must always be the name of the final export, to match the serverless template
export const main: MiddyfiedHandler = layerApiWithBody(handler, schema);
