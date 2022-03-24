export default {
  type: 'object',
  properties: {
    form: { type: 'string' },
    formData: {
      type: 'object',
      properties: {
        clientName: { type: 'string' },
        restaurantName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        postalCode: { type: 'string' },
        pos: { type: 'string' },
        posAlt: { type: 'string' },
        name: { type: 'string' },
        website: { type: 'string' },
        clientCount: { type: 'string' },
        connectivity: { type: 'string' },
        operatingSystems: {
          type: 'array',
          items: { type: 'string' },
        },
        notes: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  required: ['form', 'formData'],
  additionalProperties: false,
} as const;
