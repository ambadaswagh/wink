interface ApiGetOrderResponse extends ApiResponse {
  order: Order;
  stripeAccountId?: string;
  servicePoint: Partial<ServicePoint>;
  serviceLocation: Partial<ServiceLocation>;
  posCapabilities: PosCapabilities;
}

interface ApiPostBillCreate extends ApiResponse {
  processorTransactionId: string;
}

interface ApiPostBillUpdateBody {
  processorTransactionId: string;
  servicePoint: Partial<ServicePoint>;
  order: Order;
  settlementRequest: SettlementRequest;
}

interface ApiPostBillCreateBody {
  userId: string;
  merchantId: string;
  order: Order;
  settlementRequest: SettlementRequest;
  locale?: string;
}

interface ApiBillUpdateResponse extends ApiResponse {
  message: UpdateOrderError | 'OK';
  checkoutTransactionId: string;
  settlementResponse: UpdateOrderResult;
}
