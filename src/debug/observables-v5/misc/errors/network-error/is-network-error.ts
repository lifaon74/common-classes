import { INetworkError } from './network-error-interface';

export function isNetworkError(value: any): value is INetworkError {
  return value.name === 'NetworkError';
}

