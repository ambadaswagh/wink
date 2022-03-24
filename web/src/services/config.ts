import { Env, env } from './env';

const config =
  env === Env.Prod
    ? {
        api: {
          baseUrl: 'https://api.winkapp.me',
        },
        stripe: {
          publishableKey:
            //'pk_live_51JBImEBZHD1xWUQM0ckwvFTrI3tXsSAODTsLNJlAPfpkxzgPKO97NnYoFVbMSczNrWCuDmXPkmSy4Ep6Tnyv7KOk00kTI9IiQI',
            'pk_test_51JBImEBZHD1xWUQMdQujH5Qo9qWZOH9focsOeey4XX49iiv9rohNI8PKZjFcH6armUZNZoWtJ7ja8i1Ld0Pusufo00BMCSVNWj',
        },
        cognito: {
          appClientId: '7pcj5b2p6b5tl9gipjan7veppl',
        },
      }
    : {
        api: {
          baseUrl: 'http://localhost:3012',
        },
        stripe: {
          publishableKey:
            'pk_test_51JBImEBZHD1xWUQMdQujH5Qo9qWZOH9focsOeey4XX49iiv9rohNI8PKZjFcH6armUZNZoWtJ7ja8i1Ld0Pusufo00BMCSVNWj',
        },
        cognito: {
          appClientId: '7pcj5b2p6b5tl9gipjan7veppl',
        },
      };

export default config;
