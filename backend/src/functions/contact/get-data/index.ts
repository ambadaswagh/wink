import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const contactInfoGetData: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/contact-get-data.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'contact/getdata',
        cors: true,
      },
    },
  ],
};

export default contactInfoGetData;
