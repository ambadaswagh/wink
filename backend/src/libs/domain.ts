import Crypto from 'crypto';

export const genMerchantId = (): string => Crypto.randomBytes(16).toString('hex');
export const genServiceLocationId = (): string => Crypto.randomBytes(12).toString('hex');
export const genServicePointSuffix = (): string => Crypto.randomBytes(4).toString('hex');
export const genCheckoutTransactionId = (): string => Crypto.randomBytes(16).toString('hex');
