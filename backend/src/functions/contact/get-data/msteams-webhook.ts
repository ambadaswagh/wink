import { config } from '@libs/config';
import { IncomingWebhook } from 'ms-teams-webhook';

const webhook = new IncomingWebhook(
  'https://winkappme.webhook.office.com/webhookb2/' + config.teams.contactWebhookKey
);

export async function sendFormNotificationToTeams(
  form: string,
  formData: ContactInfoDataWaitlist | ContactInfoDataPosDev
): Promise<unknown> {
  if (form === 'waitlist') {
    const waitlistData: ContactInfoDataWaitlist = formData;
    return webhook.send(
      JSON.stringify({
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        themeColor: '0076D7',
        summary: 'Waitlist Form Submission',
        sections: [
          {
            activityTitle: 'Waitlist Form Submission',
            facts: [
              {
                name: 'Name:',
                value: waitlistData.clientName,
              },
              {
                name: 'Email:',
                value: waitlistData.email,
              },
              {
                name: 'Phone:',
                value: waitlistData.phone,
              },
              {
                name: 'Restaurant Name:',
                value: waitlistData.restaurantName,
              },
              {
                name: 'Postal Code:',
                value: waitlistData.postalCode,
              },
              {
                name: 'POS:',
                value: waitlistData.posAlt || waitlistData.pos,
              },
            ].filter((f) => f.value),
            markdown: true,
          },
        ],
      })
    );
  } else {
    const posDevData: ContactInfoDataPosDev = formData;
    return webhook.send(
      JSON.stringify({
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        themeColor: '0076D7',
        summary: 'POS Developer Form Submission',
        sections: [
          {
            activityTitle: 'POS Developer Form Submission',
            facts: [
              {
                name: 'Name:',
                value: posDevData.name,
              },
              {
                name: 'Website:',
                value: posDevData.website,
              },
              {
                name: 'Email:',
                value: posDevData.email,
              },
              {
                name: 'Client Count:',
                value: posDevData.clientCount,
              },
              {
                name: 'Connectivity:',
                value: posDevData.connectivity,
              },
              {
                name: 'Operating Systems:',
                value: posDevData.operatingSystems,
              },
              {
                name: 'Notes:',
                value: posDevData.notes,
              },
            ].filter((f) => f.value),
            markdown: true,
          },
        ],
      })
    );
  }
}
