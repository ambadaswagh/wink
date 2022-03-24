export default {
  type: 'object',
  properties: {
    filters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        vicinity: { type: 'string' },
      },
      additionalProperties: false,
    },
    lastKey: {
      type: 'object',
      properties: {
        place_id: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  required: ['filters'],
  additionalProperties: false,
} as const;
