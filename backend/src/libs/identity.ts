import type { APIGatewayProxyCognitoAuthorizer } from 'aws-lambda';

import db, { FinalResponse } from './database';
import { GetItemOutputT } from './database/get';
import { Env, env } from './env';

export const getUser = (authorizer?: APIGatewayProxyCognitoAuthorizer): AuthorizedUser => {
  if (env === Env.Dev) {
    return {
      userId: process.env.USER || process.env.LOGNAME || 'dev',
      name: process.env.USER || process.env.LOGNAME || 'Unknown Dev User',
      email: (process.env.USER || process.env.LOGNAME || 'dev') + '@winkappme.com',
      emailVerified: true,
      picture: undefined,
      social: ['Google'],
      admin: !process.env.WINK_MERCHANT,
    };
  }

  const claims = authorizer?.claims || {};
  const groups = claims['cognito:groups'] || '';
  const admin = groups.includes('admin');

  if (env === Env.Test) {
    // set some useful defaults, if not specified by the test
    if (!claims.sub) claims.sub = 'test';
    if (!claims.name) claims.name = 'Test User';
    if (!claims.email) claims.email = 'test@winkapp.me';
  }

  return {
    userId: claims.sub,
    name: claims.name,
    email: claims.email,
    emailVerified: claims.email_verified === 'true',
    picture: claims.picture,
    social: [
      groups.includes('Google') ? 'Google' : undefined,
      groups.includes('Facebook') ? 'Facebook' : undefined,
      groups.includes('LoginWithAmazon') ? 'LoginWithAmazon' : undefined,
    ].filter((g): g is string => !!g),
    admin,
  };
};

export const getUserAccess = async (
  userId: string
): FinalResponse<GetItemOutputT<MerchantUserRow>> =>
  db.get<MerchantUserRow>({
    TableName: 'User',
    Key: { userId },
  });
