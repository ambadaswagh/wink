export default {
  type: 'object',
  properties: {
    serviceLocationId: { type: 'string' },
    servicePoints: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          posReference: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['posReference', 'name'],
        additionalProperties: false,
      },
      minItems: 1,
    },
  },
  required: ['serviceLocationId', 'servicePoints'],
} as const;
