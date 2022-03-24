import db from '@libs/database';

const TableName = 'CheckoutTransaction';

const createCheckoutTransaction = async (
  checkoutTransaction: CheckoutTransactionRow
): Promise<void> => {
  let success = false;
  let attempts = 0;
  while (!success) {
    const ok = await db.put({
      TableName,
      Item: checkoutTransaction,
    });
    if ('error' in ok) {
      console.error('checkoutTransaction put:', ok.error.message);
      if (attempts++ < 5) {
        await new Promise<void>((resolve) => setTimeout(resolve, 250 * 2 ** attempts));
      } else {
        // TODO: Use some other means to notify us of the problem? Email? Teams message?
        success = true;
      }
    } else {
      success = true;
    }
  }
};

const getCheckoutTransaction = async (
  paymentProcessor: string,
  processorTransactionId: string
): Promise<CheckoutTransactionRow | undefined | null> => {
  // TODO: try a few times, like the one above (extract the logic above into a lib function)
  const rs = await db.query<CheckoutTransactionRow>({
    TableName,
    IndexName: 'processorTransactionIdIdx',
    KeyConditionExpression:
      'paymentProcessor = :paymentProcessor AND processorTransactionId = :processorTransactionId',
    ExpressionAttributeValues: {
      ':paymentProcessor': paymentProcessor,
      ':processorTransactionId': processorTransactionId,
    },
  });
  if ('error' in rs) {
    console.error(rs.error.message);
    return null; // error
  }
  return rs.data.Items[0];
};

const checkoutTransactionRepo = {
  createCheckoutTransaction,
  getCheckoutTransaction,
};

export default checkoutTransactionRepo;
