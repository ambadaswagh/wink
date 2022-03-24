import { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';

import { api } from './api';
import config from './config';
import routes, { history } from './routes';

const LOCALSTORAGE_TOKEN = 'winkToken';
export const LOCALSTORAGE_SELECTEDMERCHANT = 'winkSelectedMerchantId';

let localUser: LocalUser | null = null;

export const saveToken = (token: CognitoAuthResponse) => {
  if (!token.created_at) token.created_at = Date.now();
  localStorage.setItem(LOCALSTORAGE_TOKEN, JSON.stringify(token));
  const profile = jwtDecode<UserProfile>(token.id_token);
  localUser = {
    userId: profile.sub,
    token,
    profile,
  };
};

export const getLocalUser = () => localUser;

export const logout = () => {
  localUser = null;
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
  localStorage.removeItem(LOCALSTORAGE_SELECTEDMERCHANT);
};

export const isTokenValid = (token: CognitoAuthResponse): boolean =>
  (token.created_at || 0) + token.expires_in * 1000 > Date.now();

export const loadAuth = async () => {
  const tokenStr = localStorage.getItem(LOCALSTORAGE_TOKEN);
  if (!tokenStr) {
    unauthRedir();
    return;
  }

  const token: CognitoAuthResponse = JSON.parse(tokenStr);
  const profile: UserProfile = jwtDecode<UserProfile>(token.id_token);
  if (isTokenValid(token)) {
    // should be still ok
    localUser = {
      userId: profile.sub,
      token,
      profile,
    };
    return;
  }

  const expires = new Date(token.created_at || 0);
  const now = new Date();
  expires.setDate(expires.getDate() + 89);
  const refreshed =
    expires < now
      ? null // too late
      : await refreshToken(token); // try to refresh
  if (!refreshed) {
    // TODO: show error message to user
    localUser = null;
    unauthRedir();
    return;
  }
  saveToken(refreshed);
  return;
};

const refreshToken = async (token: CognitoAuthResponse): Promise<CognitoAuthResponse | null> => {
  const refreshToken = token.refresh_token;
  if (!refreshToken) return null;

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: config.cognito.appClientId,
    refresh_token: refreshToken,
  });
  const resp = await api
    .post<CognitoAuthResponse>('https://auth.winkapp.me/oauth2/token', params, {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .catch(() => undefined);
  const data = resp?.data;
  if (!data?.access_token || !data?.id_token) {
    return null;
  }
  data.refresh_token = refreshToken;
  return data;
};

const unauthRedir = () => {
  if (history.location.pathname.startsWith('/dashboard')) {
    history.push(routes.home);
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  return localUser ? { Authorization: `Bearer ${localUser.token.id_token}` } : {};
};

export const getApiConfig = (): AxiosRequestConfig => ({ headers: getAuthHeaders() });

loadAuth();
