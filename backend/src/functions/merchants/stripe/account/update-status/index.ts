import { handlerPath } from '@libs/handlerResolver';
import { cors, merchantAuthorizer } from '@libs/serverlessModules';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const stripeAccountUpdateStatus: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/stripe-account-update-status.main`,
  events: [
    {
      http: {
        method: 'put',
        path: '/merchants/stripe/account/status',
        cors,
        authorizer: merchantAuthorizer,
      },
    },
  ],
};

export default stripeAccountUpdateStatus;
