type OrderItemPriceInfo = { unitPrice: number; quantity: number };

export const computeOrderTotal = (items: Array<OrderItemPriceInfo>): number =>
  items.map((i) => i.quantity * i.unitPrice).reduce((prev, curr) => prev + curr, 0);

export const comparePrice = (price1: number, price2: number): boolean =>
  Math.round(price1 * 100) === Math.round(price2 * 100);
