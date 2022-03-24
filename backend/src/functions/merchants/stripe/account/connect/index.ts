import { handlerPath } from '@libs/handlerResolver';
import { cors, merchantAuthorizer } from '@libs/serverlessModules';
import type { ServerlessFunction } from '@libs/serverlessTypes';

const stripeConnectAccount: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/stripe-account-connect.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/merchants/stripe/account/connect',
        cors,
        authorizer: merchantAuthorizer,
      },
    },
  ],
};

export default stripeConnectAccount;
