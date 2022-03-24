import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const placesGet: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/places-get.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'places/get/{id}',
        cors: true,
      },
    },
  ],
};

export default placesGet;
