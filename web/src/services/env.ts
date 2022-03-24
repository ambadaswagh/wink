import { isLocalhost } from './web';

export enum Env {
  Dev = 'DEV',
  Test = 'TEST',
  Prod = 'PROD',
}

export const env = process.env.NODE_ENV === 'test' ? Env.Test : isLocalhost() ? Env.Dev : Env.Prod;
