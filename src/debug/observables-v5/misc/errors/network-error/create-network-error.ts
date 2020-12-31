import { INetworkError, INetworkErrorOptions } from './network-error-interface';


export function createNetworkError(
  options?: INetworkErrorOptions
): INetworkError {
  const error: INetworkError = new Error(options?.message);
  error.name = 'NetworkError';
  return error;
}

export function createNetworkErrorFromRequest(
  request: Request,
): INetworkError {
  return createNetworkError({ message: `${ request.method } '${ request.url }'` });
}
