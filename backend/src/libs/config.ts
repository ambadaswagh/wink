import { Env, env } from './env';

const domain =
  env === Env.Prod
    ? {
        host: 'https://winkapp.me',
      }
    : {
        host: 'http://localhost:3011',
      };

export const config = {
  stripe: {
    key: process.env.STRIPE_KEY || '',
    clientId: process.env.STRIPE_CLIENT_ID || '',
  },
  teams: {
    contactWebhookKey: process.env.TEAMS_CONTACT_WEBHOOK_KEY,
  },
  domain,
};
