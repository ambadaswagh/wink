import { FinalResponse } from '@libs/database';
import { HttpException, HttpStatusCode } from '@libs/http';

export const callDdb = async <T>(call: () => FinalResponse<T>): FinalResponse<T> => {
  const response = await call();

  if ('error' in response) {
    throw new HttpException(response.error.message, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  return response;
};
