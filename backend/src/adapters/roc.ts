import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const getOrder = async ({
  servicePoint,
  serviceLocation,
}: GetOrderParameters<PosParametersRoc>): Promise<Order> => {
  const posParameters = serviceLocation.posParameters;

  const query = new URLSearchParams({
    TableId: servicePoint.posReference,
    WaiterName: 'WinkApp',
  });
  const data: RocGetOrderResponse = await fetch(
    getApiUrl(posParameters, 'getOrder') + '?' + query.toString(),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30 * 1000,
    }
  ).then((r) => r.json());

  const order: Order = {
    servicePointId: servicePoint.servicePointId,
    lastUpdateTs: Date.now() / 1000,
    items: data.Items.filter((i) => !i.ParentKey).map((i) => ({
      orderItemId: i.Key,
      description: i.Description,
      quantity: Number(i.Quantity),
      unitPrice: roundPrice(i.Price),
      modifiers: data.Items.filter((m) => m.ParentKey === i.Key).map((i) => ({
        orderItemId: i.Key,
        description: i.Description,
        quantity: Number(i.Quantity),
        unitPrice: roundPrice(i.Price),
        modifiers: [],
        payable: true,
        posData: { ItemId: i.ItemId },
      })),
      payable: true,
      posData: { ItemId: i.ItemId },
    })),
  };

  // Business rule: if one waiter ordered > 50% of the items, he gets named, otherwise no waiter
  const minItems = order.items.reduce((sum, i) => sum + i.quantity, 0) / 2;
  const waiters = data.Items.filter((i) => !i.ParentKey).reduce((p, item) => {
    if (!p[item.User]) p[item.User] = 0;
    p[item.User] += Number(item.Quantity);
    return p;
  }, {} as Record<string, number>);
  order.waiter = Object.keys(waiters)
    .filter((w) => waiters[w] > minItems)
    .pop();

  return order;
};

const updateOrder = async ({
  servicePoint,
  serviceLocation,
  items,
  tipAmount: tip,
}: UpdateOrderParameters<PosParametersRoc>): Promise<UpdateOrderResult> => {
  const posParameters = serviceLocation.posParameters as PosParametersRoc;
  const { userName: waiterName, paymentName } = serviceLocation.posParameters;

  const data: RocPaymentResponse = await fetch(getApiUrl(posParameters, 'Payment'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      TableId: servicePoint.posReference,
      WaiterName: waiterName || 'WinkApp',
      PaymentName: paymentName || 'Wink',
      PaymentType: 'Split',
      PrinterName: '',
      TipAmount: tip.toFixed(2),
      Items: items
        .map((i) => {
          return [
            {
              Key: i.orderItemId,
              Quantity: i.quantity.toFixed(0),
              Price: i.unitPrice.toFixed(2),
              ItemId: i.posData?.ItemId,
            },
            ...i.modifiers.map((i) => ({
              Key: i.orderItemId,
              Quantity: i.quantity.toFixed(0),
              Price: i.unitPrice.toFixed(2),
              ItemId: i.posData?.ItemId,
            })),
          ];
        })
        .flat(1),
    }),
  }).then((r) => r.json());
  console.log('roc data:', data);

  const success = data.Status === 'OK';

  return {
    error: success ? undefined : 'FAIL',
    transactionId: data.InvoiceId,
  };
};

const getCapabilities = async (
  params: PosConfigParameters<PosParametersRoc>
): Promise<PosCapabilitiesResponse> => {
  const { apiBaseUri, paymentName, tipArticleId, userName } = params.serviceLocation.posParameters;

  if (!apiBaseUri) return { error: 'Missing Base URI for API Endpoint (full URL with POS IP)' };
  if (!paymentName) return { error: 'Missing Payment Method Name (Wink)' };
  if (!userName) return { error: 'Missing User Name (operator login)' };
  if (!tipArticleId) return { error: 'Missing Tip Article ID (usually 7004)' };
  return {
    splitMethod: 'LINE_ITEM',
    tip: true,
  };
};

const getApiUrl = (params: PosParametersRoc, endpoint: string) =>
  `${params.apiBaseUri}/${endpoint}`;

const roundPrice = (price: string) => Math.round(Number(price) * 100) / 100;

const roc: PosAdapter<PosParametersRoc> = {
  getOrder,
  updateOrder,
  getCapabilities,
};

export default roc;

interface RocGetOrderResponse {
  DayNo: string;
  TableId: string;
  Items: RocItem[];
}

interface RocItem {
  ItemId: string;
  ParentKey: string;
  Key: string;
  Vat: string;
  Quantity: string;
  User: string;
  Description: string;
  Price: string;
}

interface RocPaymentResponse {
  TableId: string;
  InvoiceId: string;
  Status: string;
}
