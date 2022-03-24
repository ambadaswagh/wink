import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const placesScan: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/places-scan.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'places/scan',
        cors: true,
      },
    },
  ],
};

export default placesScan;
