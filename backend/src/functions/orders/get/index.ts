import { handlerPath } from '@libs/handlerResolver';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const ordersGet: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/orders-get.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'orders/{id}',
        cors: true,
      },
    },
  ],
  timeout: 30,
};

export default ordersGet;
