import { handlerPath } from '@libs/handlerResolver';
import { cors, merchantAuthorizer } from '@libs/serverlessModules';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const merchantsCreate: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/merchants-create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/merchants',
        cors,
        authorizer: merchantAuthorizer,
      },
    },
  ],
};

export default merchantsCreate;
