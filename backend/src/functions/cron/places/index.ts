import { handlerPath } from '@libs/handlerResolver';
import { ServerlessFunction } from '@libs/serverlessTypes';

const hello: ServerlessFunction = {
  handler: `${handlerPath(__dirname)}/cron-places.main`,
  // events: [
  //   {
  //     schedule: '5 3 20 * ? *' // 03:05am of every 20th day of the month
  //   }
  // ],
};

export default hello;
