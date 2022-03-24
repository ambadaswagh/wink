interface Order {
  servicePointId: string;
  lastUpdateTs: number;
  waiter?: string;
  items: OrderItem[];
  posData?: Record<string, any>;
}

interface SettlementRequest {
  items: SettlementRequestItem[];
  tipAmount: number;
}

interface OrderItem {
  orderItemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  modifiers: OrderItemModifier[];
  payable: boolean;
  posData?: Record<string, any>;
}

type OrderItemModifier = Omit<OrderItem, 'modifiers'>;

interface SettlementRequestItem {
  orderItemId: string;
  quantity: number;
}
