import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const billUpdate: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/bill-update.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'bill/update',
        cors: true,
      },
    },
  ],
};

export default billUpdate;
