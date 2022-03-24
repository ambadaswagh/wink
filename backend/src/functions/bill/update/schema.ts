import settlementRequest from '../../../schemas/settlementRequest';

export const BillUpdateBodySchema = {
  type: 'object',
  properties: {
    processorTransactionId: { type: 'string' },
    servicePoint: {
      type: 'object',
      properties: {
        servicePointId: { type: 'string' },
        posReference: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['name'],
      additionalProperties: false,
    },
    order: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              orderItemId: { type: 'string' },
              description: { type: 'string' },
              quantity: { type: 'number' },
              unitPrice: { type: 'number' },
              modifiers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    orderItemId: { type: 'string' },
                    description: { type: 'string' },
                    quantity: { type: 'number' },
                    unitPrice: { type: 'number' },
                    modifiers: { type: 'array', maxItems: 0 },
                    payable: { type: 'boolean' },
                    posData: { type: 'object' },
                  },
                  required: ['orderItemId', 'description', 'quantity', 'unitPrice', 'payable'],
                  additionalProperties: false,
                },
              },
              payable: { type: 'boolean' },
              posData: { type: 'object' },
            },
            required: [
              'orderItemId',
              'description',
              'quantity',
              'unitPrice',
              'modifiers',
              'payable',
            ],
            additionalProperties: false,
          },
        },
        lastUpdateTs: { type: 'number' },
        servicePointId: { type: 'string' },
        waiter: { type: 'string' },
      },
      required: ['items', 'servicePointId', 'lastUpdateTs'],
      additionalProperties: false,
    },
    settlementRequest,
  },
  required: ['processorTransactionId', 'order', 'servicePoint', 'settlementRequest'],
  additionalProperties: false,
} as const;
