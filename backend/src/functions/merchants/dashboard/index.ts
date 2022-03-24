import { handlerPath } from '@libs/handlerResolver';
import { cors, merchantAuthorizer } from '@libs/serverlessModules';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const merchantsDashboard: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/merchants-dashboard.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/merchants/dashboard',
        cors,
        authorizer: merchantAuthorizer,
      },
    },
  ],
};

export default merchantsDashboard;
