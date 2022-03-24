interface PosAdapter<T = PosParameters> {
  getCapabilities: (params: PosConfigParameters<T>) => Promise<PosCapabilitiesResponse>;
  getOrder: (params: GetOrderParameters<T>) => Promise<Order>;
  updateOrder: (params: UpdateOrderParameters<T>) => Promise<UpdateOrderResult>;
}

interface PosConfigParameters<T = PosParameters> {
  serviceLocation: ServiceLocationRow<T>;
  servicePoint: ServicePointRow;
}

type GetOrderParameters<T> = PosConfigParameters<T>;

interface UpdateOrderParameters<T = PosParameters> {
  serviceLocation: ServiceLocationRow<T>;
  servicePoint: ServicePointRow;
  items: OrderItem[];
  tipAmount: number;
}

interface UpdateOrderResult {
  error?: UpdateOrderError;
  transactionId?: string;
  receiptUrl?: string;
}

type UpdateOrderError = 'FAIL';

interface PosParametersEmpty {}

type PosCapabilitiesResponse = PosCapabilities | PosCapabilitiesError;

interface PosCapabilities {
  splitMethod: 'FULL_ORDER' | 'CURRENCY_AMOUNT' | 'LINE_ITEM' | 'ITEM' | 'ITEM_FRACTION';
  tip: boolean;
}
interface PosCapabilitiesError {
  error: string;
}
