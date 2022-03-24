import { handlerPath } from '@libs/handlerResolver';
import { cors, merchantAuthorizer } from '@libs/serverlessModules';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const servicePointsCreate: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/servicePoints-create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/servicePoints',
        cors,
        authorizer: merchantAuthorizer,
      },
    },
  ],
};

export default servicePointsCreate;
