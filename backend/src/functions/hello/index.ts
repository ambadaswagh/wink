import { handlerPath } from '@libs/handlerResolver';

import schema from './schema';

const hello = {
  handler: `${handlerPath(__dirname)}/hello.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export default hello;
