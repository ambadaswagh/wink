import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const billCreate: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/bill-create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'bill/create',
        cors: true,
      },
    },
  ],
};

export default billCreate;
