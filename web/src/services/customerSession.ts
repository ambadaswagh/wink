import { getRandomString } from './crypto';

const STORAGEKEY_USERID = 'winqUserId';
export const userId = resolveUserId();
const STORAGEKEY_SESSION = `session-${userId}`;

function resolveUserId() {
  const savedUserId = localStorage.getItem(STORAGEKEY_USERID);
  if (savedUserId) return savedUserId;
  const newUserId = getRandomString(32);
  localStorage.setItem(STORAGEKEY_USERID, newUserId);
  return newUserId;
}

export const setSession = (data: SessionData) => {
  localStorage.setItem(STORAGEKEY_SESSION, JSON.stringify(data));
};

export const getSession = (): SessionData | undefined => {
  const foundSessionStr = localStorage.getItem(STORAGEKEY_SESSION);
  if (!foundSessionStr) return;
  return JSON.parse(foundSessionStr);
};

export const clearSession = () => {
  localStorage.removeItem(STORAGEKEY_SESSION);
};

export interface SessionData {
  processorTransactionId?: string;
  order: Order;
  servicePoint: Partial<ServicePoint>;
  serviceLocation: Partial<ServiceLocation>;
  settlementRequest: SettlementRequest;
}
