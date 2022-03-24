const settlementRequest = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          orderItemId: { type: 'string' },
          quantity: { type: 'number' },
        },
        required: ['orderItemId', 'quantity'],
        additionalProperties: false,
      },
    },
    tipAmount: {
      type: 'number',
      minimum: 0,
    },
  },
  required: ['items', 'tipAmount'],
  additionalProperties: false,
};

export default settlementRequest;
