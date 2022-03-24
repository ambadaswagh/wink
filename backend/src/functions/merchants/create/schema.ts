export default {
  type: 'object',
  properties: {
    merchant: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        contact: {
          type: 'object',
          properties: {
            legalName: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postalCode: { type: 'string' },
            countryId: { type: 'string' },
            phoneNumber: { type: 'string' },
            businessEmail: { type: 'string' },
            website: { type: 'string' },
            taxId: { type: 'string' },
          },
          required: ['legalName', 'countryId'],
        },
        defaultLocale: { type: 'string' },
        enabledPaymentTypes: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        servicePointDenomination: {
          type: 'object',
          properties: {
            singular: { type: 'string' },
            plural: { type: 'string' },
          },
          required: ['singular', 'plural'],
        },
        currencyId: { type: 'string' },
      },
      required: [
        'name',
        'contact',
        'defaultLocale',
        'servicePointDenomination',
        'enabledPaymentTypes',
        'currencyId',
      ],
    },
  },
  required: ['merchant'],
} as const;
