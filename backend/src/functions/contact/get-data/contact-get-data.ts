import { response, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import db from '@libs/database';
import { HttpException } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';

import { sendFormNotificationToTeams } from './msteams-webhook';
import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  if (event.body.form === 'waitlist') {
    const contactData: ContactInfoDataWaitlist = event.body.formData;

    const newContactInfo: ContactInfoRow = {
      contactType: event.body.form,
      contactTs: Date.now() / 1000,
      contactData,
    };

    const ok = await db.put({
      TableName: 'ContactInfo',
      Item: newContactInfo,
    });
    if ('error' in ok) throw new HttpException(ok.error.message);
  } else {
    const contactData: ContactInfoDataPosDev = event.body.formData;

    const newContactInfo: ContactInfoRow = {
      contactType: event.body.form,
      contactTs: Date.now() / 1000,
      contactData,
    };

    const ok = await db.put({
      TableName: 'ContactInfo',
      Item: newContactInfo,
    });
    if ('error' in ok) throw new HttpException(ok.error.message);
  }

  try {
    await sendFormNotificationToTeams(event.body.form, event.body.formData);
  } catch (err) {
    return response({ message: err.message }, 500);
  }

  return response({
    message: 'ok',
    event,
  });
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, schema);
