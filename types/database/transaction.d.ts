interface CheckoutTransactionRow {
  checkoutTransactionId: string;
  merchantId: string;
  serviceLocationId: string;
  servicePointId: string;
  paymentTs: number;
  userId?: string;
  waiter?: string;
  posTransaction?: string;
  paymentProcessor: 'Stripe' | 'PayPal';
  processorTransactionId: string; // Stripe or PayPal Transaction ID
  items: CheckoutOrderItem[];
  totalPrice: number;
  receiptUrl?: string;
}

interface CheckoutOrderItem {
  orderItemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  modifiers: CheckoutOrderItemModifier[];
}

interface CheckoutOrderItemModifier {
  orderItemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
