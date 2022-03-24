import 'dotenv/config';

import { Context, EventBridgeEvent } from 'aws-lambda';

import { main } from './cron-places';

main({} as unknown as EventBridgeEvent<'Scheduled Event', null>, {} as unknown as Context, () => 0);
