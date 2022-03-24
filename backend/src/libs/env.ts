export enum Env {
  Dev = 'dev',
  Test = 'test',
  Prod = 'prod',
}

export const env: Env =
  process.env.NODE_ENV === 'test' ? Env.Test : process.env.IS_OFFLINE ? Env.Dev : Env.Prod;
