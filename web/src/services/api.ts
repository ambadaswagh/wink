import Axios, { AxiosError } from 'axios';

import config from './config';
import { userId } from './customerSession';
import { appVersion } from './project';

export const api = Axios.create({
  baseURL: config.api.baseUrl,
  withCredentials: false,
  validateStatus: () => true,
});

export const apiUri = (
  endpoint: string,
  params: string[] = [],
  query: Record<string, string> = {}
) => {
  query.v = appVersion.toString();
  query.userId = userId;
  const qs = new URLSearchParams(query);
  return endpoint + '/' + params.join('/') + '?' + qs.toString();
};

api.interceptors.response.use(
  (response) => {
    const status = response.status;
    if (status >= 400) {
      // an error
      response.data =
        typeof response.data === 'string' // `data` might not be an object
          ? { message: response.data } // just put the string in the message
          : {
              // reconstruct data, possibly setting message
              message: response.statusText || response.data?.error,
              ...response.data, // but if `message:` already present, keep it
            };
      return response;
    }
    if (typeof response.data === 'string') {
      // Note: 2xx and 3xx responses might not have a json payload, and ts will not complain.
      // We have to make sure data is an object for our "in" operator to work
      response.data = { message: '' };
    }
    return response;
  },
  (error: AxiosError) => {
    // This should be a timeout error
    if (error.code === 'ECONNABORTED') {
      return { data: { message: 'Connection failed', code: error.code } };
    }
    return { data: { message: error.message, code: error.code } };
  }
);
