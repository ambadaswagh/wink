import { vectronCommand, VectronConnection } from './comm';

const appId = '445bffa108c9e929';

interface VectronCommandOtherData {
  msgClass: string;
  TransNo: number;
  [key: string]: string | number | never[] | boolean;
}
interface VectronCommandConnectData {
  AppID: string;
  msgClass: string;
  Protocol: string;
  Data: number;
}
interface VectronCommandGetMasterData {
  AppId: string;
  msgClass: string;
  Port2: number;
  MD_Timestamp: number;
  TransNo: number;
}

const protocol = {
  connect: {
    AppID: appId,
    msgClass: 'CONNECT',
    Protocol: '2.1',
    Data: 1,
  } as VectronCommandConnectData,
  getMasterData: {
    AppId: appId,
    msgClass: 'GETMASTERDATA',
    Port2: 42504,
    MD_Timestamp: 0, // must update
    TransNo: 1,
  } as VectronCommandGetMasterData,
  signIn: {
    AppID: appId,
    msgClass: 'SIGNIN',
    OperatorNo: 250, // must update
    Pin: 0,
    TransNo: 1,
  } as VectronCommandOtherData,
  getOpenGCList: {
    AppID: appId,
    msgClass: 'GETOGCLIST',
    OperatorNo: 250, // must update
    TransNo: 1,
  } as VectronCommandOtherData,
  getGC: {
    AppID: appId,
    msgClass: 'OPENGC',
    GCNo: 0, // must update
    TransNo: 1,
  } as VectronCommandOtherData,
  closeGC: {
    AppID: appId,
    msgClass: 'CLOSEGC',
    OperatorNo: 250, // must update
    GCNo: 0, // must update
    Cancel: 0,
    MoveGC: 0,
    PrtProfile: 0,
    Receipt: [],
    Separate: 0,
    SubTotalInv: 0,
    Void: 0,
    TransNo: 1,
  } as VectronCommandOtherData,
  splitBill: {
    AppID: appId,
    msgClass: 'MEDIA',
    MediaNo: 0, // payment method: must update
    OperatorNo: 250, // must update
    GCNo: 0, // table: must update
    Receipt: [], // items: must update
    TipAmount: 0,
    DeliveryNote: 0,
    fromReceipt: false,
    PartialPayment: 0,
    PrintFlag: 1,
    PrtProfile: 0,
    Separate: 1,
    TransNo: 1,
  } as VectronCommandOtherData,
};

export const getVectronConnection = async (
  serviceLocation: ServiceLocationRow<PosParametersVectron>
): Promise<VectronConnection> => {
  const { host, port } = serviceLocation.posParameters;
  const connectReply = await getPortAssignment(host, port);
  if (connectReply.ErrCode) throw Error('Connect: ' + connectReply.ErrText);
  const conn: VectronConnection = { host, port: connectReply.Port };

  return conn;
};

const getPortAssignment = async (host: string, port: number): Promise<VectronConnectReply> => {
  const connectReplyStr = await vectronCommand({ host, port }, protocol.connect);
  if (!connectReplyStr[0]) throw Error('Could not connect to POS');
  return JSON.parse(connectReplyStr[0]);
};

export const getMasterData = async (
  conn: VectronConnection
): Promise<VectronGetMasterDataReply[]> => {
  const message = Object.assign({}, protocol.getMasterData, { MD_Timestamp: Date.now() });
  const masterDataStr = await vectronCommand(conn, message);
  if (!masterDataStr.length) throw Error('Could not obtain master data from POS');
  return masterDataStr.map((str) => JSON.parse(str));
};

export const signinOperator = async (
  conn: VectronConnection,
  operatorId: number
): Promise<VectronSigninReply> => {
  const message = Object.assign({}, protocol.signIn, { OperatorNo: operatorId });
  const signinStr = await vectronCommand(conn, message);
  if (!signinStr[0]) throw Error('Could not sign into POS');
  return JSON.parse(signinStr[0]) as VectronSigninReply;
};

export const getTable = async (
  conn: VectronConnection,
  tableNumber: number
): Promise<VectronOpenGCReply> => {
  const message = Object.assign({}, protocol.getGC, { GCNo: tableNumber });
  const getGcStr = await vectronCommand(conn, message);
  if (!getGcStr[0]) throw Error('Could not get table from POS');
  return JSON.parse(getGcStr[0]);
};

export const splitBill = async (params: SplitBillParams): Promise<VectronSplitBillReply> => {
  const { conn, paymentMethodId, operatorId, tableNumber, items, tipAmount } = params;

  const receipt: VectronReceipt[] = items.map((i) => ({
    b: Number(i.orderItemId),
    c: i.quantity.toString(),
    a: 1,
    Type: 'S',
  }));
  const message = Object.assign({}, protocol.splitBill, {
    MediaNo: paymentMethodId,
    OperatorNo: operatorId,
    GCNo: tableNumber,
    Receipt: receipt,
    TipAmount: tipAmount,
  });
  const getGcStr = await vectronCommand(conn, message);
  if (!getGcStr[0]) throw Error('Could not split bill (MEDIA) with POS');
  return JSON.parse(getGcStr[0]);
};

export const getPosData = async (
  serviceLocation: ServiceLocationRow<PosParametersVectron>
): Promise<Partial<VectronSavedData>> => {
  const conn = await getVectronConnection(serviceLocation);
  // Note: getMasterData cannot come after signinOperator or Vectron will give errors back
  const masterDataList = await getMasterData(conn);
  const masterProducts = masterDataList
    .map((table) => table.msgClass === 'PLUS' && table.MD_PLUs)
    .filter((p): p is VectronPLU[] => !!p)
    .flat(1);
  const paymentMethodList = masterDataList.find((t) => t.msgClass === 'MEDIA_STATUS') as
    | VectronMasterDataMediaStatus
    | undefined;
  const paymentMethod = paymentMethodList?.MD_Media.find((m) => m.Name === 'Wink');
  if (!paymentMethod) return {};
  const paymentMethodId = paymentMethod.No;
  const tipEnabled = paymentMethod.ChangePossible;

  const signinReply = await signinOperator(conn, serviceLocation.posParameters.operatorId);
  if (signinReply.ErrCode) throw Error('Signin Operator: ' + signinReply.ErrText);

  const posData: VectronSavedData = {
    lastUpdate: Date.now(),
    masterProductsStr: JSON.stringify(masterProducts),
    paymentMethodId,
    tipEnabled,
    operatorPort: conn.port,
  };
  return posData;
};

interface VectronConnectReply {
  msgClass: 'CONNECTreply';
  ErrCode: number;
  ErrText?: string;
  BOOKPLUSsupported: boolean;
  BVActive: boolean;
  Brand: number;
  ChangeTipCalculatorAvailable: boolean;
  CountryMode: string;
  Debug: number;
  DeliveryNoteFromScript: boolean;
  DigitalBon: number;
  Lang: string;
  MD_Timestamp: number;
  Name: string;
  POSVersion: string;
  Port: number;
  Protocol: string;
  PrtProfiles: unknown[];
  ScriptVersion: string;
  Timeout: number;
  UseGuestCount: number;
  Version: string;
  custTab: string[];
}

interface VectronOpenGCReply {
  msgClass: 'OPENGCreply';
  ErrCode: number;
  ErrText?: string;
  PLUs: VectronPLU[];
  Total: string;
}

type VectronGetMasterDataReply = VectronMasterDataPLUs | VectronMasterDataMediaStatus;

interface VectronMasterData {
  msgClass: 'PLUS' | 'SELWIN' | 'DISCOUNTS' | 'FAVORITES' | 'MEDIA_STATUS';
  ErrCode: number;
  ErrText?: string;
}
interface VectronMasterDataPLUs extends VectronMasterData {
  msgClass: 'PLUS';
  MD_PLUs: VectronPLU[];
}
export interface VectronMasterDataMediaStatus {
  msgClass: 'MEDIA_STATUS';
  MD_Media: VectronMasterDataMedia[];
}
interface VectronMasterDataMedia {
  ChangePossible: boolean;
  EFTMedia: number;
  Limit: string;
  Name: string; // Wink
  No: number; // paymentMethodId
  PartialPaymentAllowed: number;
  ScriptPaymentContext: string;
}

export interface VectronPLU {
  BookingID: number;
  EcrNo: number;
  Factor: string;
  No: number;
  Price: string;
  Type: 'P' | 'L';
  Name?: string; // only from MasterData?
}

interface VectronSigninReply {
  msgClass: 'SIGNINreply';
  ErrCode: number;
  ErrText?: string;
  HotelInterface: string;
  Modifier: string;
  OpNo: number;
  Rights: number;
  ScriptTasks: unknown[];
  TipAllowed: boolean;
}

// interface VectronCloseOGCReply {
//   msgClass: 'CLOSEGCreply';
//   ErrCode: number;
//   ErrText?: string;
//   Total: string;
// }

interface VectronSplitBillReply {
  msgClass: 'MEDIAreply';
  ErrCode: number;
  ErrText?: string;
  AmountToPay: number;
  Medias: unknown[];
  Total: string;
  bvData: {
    PLUs: VectronPLU[];
    Total: string;
  };
}

interface VectronReceipt {
  b: number; // BookingID
  c: string;
  a: number;
  Type: 'S';
}

export interface SplitBillParams {
  conn: VectronConnection;
  operatorId: number;
  paymentMethodId: number;
  tableNumber: number;
  items: OrderItem[];
  tipAmount: number;
}

export interface VectronSavedData {
  lastUpdate: number;
  masterProductsStr: string;
  paymentMethodId: number;
  tipEnabled: boolean;
  operatorPort: number;
}
