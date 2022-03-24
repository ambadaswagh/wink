import db from '@libs/database';

import { VectronConnection } from './comm';
import {
  getPosData,
  getTable,
  splitBill,
  SplitBillParams,
  VectronPLU,
  VectronSavedData,
} from './commands';

const getOrder = async (params: GetOrderParameters<PosParametersVectron>): Promise<Order> => {
  const { servicePoint, serviceLocation } = params;
  const vectronSavedData = serviceLocation.posData as VectronSavedData | undefined;
  if (!vectronSavedData) throw Error('Vectron not connected');
  const tableNumber = Number(servicePoint.posReference);
  //const conn = await getVectronConnection(serviceLocation);
  const conn: VectronConnection = {
    host: serviceLocation.posParameters.host,
    port: vectronSavedData.operatorPort,
  };

  const masterProducts = JSON.parse(vectronSavedData.masterProductsStr) as VectronPLU[];

  const table = await tryGetTable(serviceLocation, conn, tableNumber);
  if (table.ErrCode !== 0) throw Error('Get Table: ' + table.ErrText);

  const items: OrderItem[] = table.PLUs.reduce((list, plu, idx) => {
    if (plu.Type === 'L' || !Number(plu.Price)) return list;

    // process modifiers
    const nextNonModifier = table.PLUs.findIndex((p, i) => i > idx && p.Type === 'P');
    const modifiers = table.PLUs.slice(
      idx + 1, // start looking at the next item after this one
      nextNonModifier === -1 ? undefined : nextNonModifier // and stop before the next product item
    ).map((plu): OrderItemModifier => {
      const product = masterProducts.find((p) => p.No === plu.No);
      const quantity = Number(plu.Factor);
      return {
        orderItemId: plu.BookingID.toString(),
        description: product?.Name || plu.No.toString(),
        quantity,
        unitPrice: Number(plu.Price) / quantity,
        payable: true,
      };
    });

    // create actual item
    const product = masterProducts.find((p) => p.No === plu.No);
    const quantity = Number(plu.Factor);
    return list.concat({
      orderItemId: plu.BookingID.toString(),
      description: product?.Name || plu.No.toString(),
      quantity,
      unitPrice: Number(plu.Price) / quantity,
      modifiers,
      payable: true,
    });
  }, [] as OrderItem[]);

  return {
    lastUpdateTs: Date.now() / 1000,
    servicePointId: servicePoint.servicePointId,
    items,
  };
};

const updateOrder = async ({
  servicePoint,
  serviceLocation,
  items,
  tipAmount,
}: UpdateOrderParameters<PosParametersVectron>): Promise<UpdateOrderResult> => {
  const vectronSavedData = serviceLocation.posData as VectronSavedData;
  if (!vectronSavedData) throw Error('Vectron not connected');
  const tableNumber = Number(servicePoint.posReference);
  const { operatorId } = serviceLocation.posParameters;
  const conn: VectronConnection = {
    host: serviceLocation.posParameters.host,
    port: vectronSavedData.operatorPort,
  };

  const reply = await trySplitBill(serviceLocation, {
    conn,
    paymentMethodId: vectronSavedData.paymentMethodId,
    operatorId,
    tableNumber,
    items,
    tipAmount,
  });
  if (reply.ErrCode !== 0) {
    console.error('Split Bill: ' + reply.ErrText);
    return { error: 'FAIL' };
  }

  return {};
};

const getCapabilities = async (
  params: PosConfigParameters<PosParametersVectron>
): Promise<PosCapabilitiesResponse> => {
  const serviceLocation = params.serviceLocation;
  const { host, port, operatorId } = serviceLocation.posParameters;
  if (!host) return { error: 'Missing Host (IP) of POS' };
  if (!port) return { error: 'Missing Port for POS login (usually 9999)' };
  if (!operatorId) return { error: 'Missing Operator ID for login (usually 250)' };
  if (!Number(params.servicePoint.posReference)) {
    return {
      error: `POS Reference (table/GC number) for Service Point ${params.servicePoint.servicePointId} is not a positive number (${params.servicePoint.posReference})`,
    };
  }

  const masterDataSaved = await getFreshPosData(serviceLocation);
  if (typeof masterDataSaved === 'string') return { error: masterDataSaved };

  return {
    splitMethod: 'ITEM',
    tip: masterDataSaved.tipEnabled,
  };
};

const getFreshPosData = async (serviceLocation: ServiceLocationRow<PosParametersVectron>) => {
  const masterDataSaved = (serviceLocation.posData as VectronSavedData) || undefined;
  if (masterDataSaved && masterDataSaved.lastUpdate > Date.now() - 1000 * 60 * 60 * 23) {
    return masterDataSaved;
  }
  const posData = await getPosData(serviceLocation);
  const { paymentMethodId, operatorPort, lastUpdate, tipEnabled, masterProductsStr } = posData;
  if (!paymentMethodId) return 'Missing Payment Method for Wink';
  if (!operatorPort) return 'Operator port not received';
  if (!lastUpdate) throw Error('Assertion: lastUpdate not set by getPosData?');
  if (!masterProductsStr) throw 'Product list not received';

  // recreate object assuring it's not Partial anymore
  const fullPosData: VectronSavedData = {
    paymentMethodId,
    operatorPort,
    lastUpdate,
    tipEnabled: !!tipEnabled,
    masterProductsStr,
  };
  savePosData(serviceLocation, fullPosData);
  return fullPosData;
};

const savePosData = async (
  serviceLocation: ServiceLocationRow,
  posData: Partial<VectronSavedData>
) => {
  // doesn't save if we have a bad payload
  if (
    !posData.operatorPort &&
    !posData.lastUpdate &&
    !posData.masterProductsStr &&
    !posData.paymentMethodId
  )
    return;

  serviceLocation.posData = posData;
  return db.put({
    TableName: 'ServiceLocation',
    Item: serviceLocation,
  });
};

const tryGetTable = async (
  serviceLocation: ServiceLocationRow<PosParametersVectron>,
  conn: VectronConnection,
  tableNumber: number
) => {
  try {
    const table = await getTable(conn, tableNumber);
    if (!table.ErrCode) return table;
  } catch (e) {
    /* */
  }

  // try connecting again
  const posData = await getPosData(serviceLocation);
  if (!posData.operatorPort) throw Error('Failed to reconnect to POS');

  savePosData(serviceLocation, posData);
  conn.port = posData.operatorPort; // updates for upstream function too
  return getTable(conn, tableNumber);
};

const trySplitBill = async (
  serviceLocation: ServiceLocationRow<PosParametersVectron>,
  params: SplitBillParams
) => {
  try {
    const reply = await splitBill(params);
    if (reply.ErrCode === 0) return reply;
  } catch (e) {
    /* */
  }

  // try connecting again
  const posData = await getPosData(serviceLocation);
  if (!posData.operatorPort) throw Error('Failed to reconnect to POS');

  savePosData(serviceLocation, posData);
  params.conn.port = posData.operatorPort; // updates for upstream function too
  return splitBill(params);
};

const vectron: PosAdapter<PosParametersVectron> = {
  getOrder,
  updateOrder,
  getCapabilities,
};

export default vectron;
