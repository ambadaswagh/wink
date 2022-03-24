import crypto from 'crypto';

export const generateSessionId = (): string => crypto.randomBytes(16).toString('hex');
