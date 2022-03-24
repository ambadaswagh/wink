import settlementRequest from '../../../schemas/settlementRequest';

export const BillCreateBodySchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    merchantId: { type: 'string' },
    order: {
      type: 'object',
      properties: {
        servicePointId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              orderItemId: { type: 'string' },
              description: { type: 'string' },
              quantity: {
                type: 'number',
                exclusiveMinimum: 0,
              },
              unitPrice: {
                type: 'number',
                exclusiveMinimum: 0,
              },
              modifiers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    orderItemId: { type: 'string' },
                    description: { type: 'string' },
                    quantity: {
                      type: 'number',
                      exclusiveMinimum: 0,
                    },
                    unitPrice: {
                      type: 'number',
                      exclusiveMinimum: 0,
                    },
                    payable: { type: 'boolean' },
                    posData: { type: 'object' },
                    modifiers: { type: 'array', maxItems: 0 },
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
          minItems: 1,
          uniqueItems: true,
        },
        waiter: { type: 'string' },
        lastUpdateTs: { type: 'number' },
      },
      required: ['servicePointId', 'items', 'lastUpdateTs'],
      additionalProperties: false,
    },
    settlementRequest,
    locale: { type: 'string' },
  },
  required: ['userId', 'merchantId', 'order', 'settlementRequest'],
  additionalProperties: false,
} as const;

export const StripeAccountConnectBodySchema = {
  type: 'object',
  properties: {
    merchantId: { type: 'string' },
  },
  required: ['merchantId'],
} as const;

export const StripeAccountUpdateBodySchema = {
  type: 'object',
  properties: {
    merchantId: { type: 'string' },
  },
  required: ['merchantId'],
} as const;
