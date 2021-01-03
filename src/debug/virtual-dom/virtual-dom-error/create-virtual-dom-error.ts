import { IVirtualDOMError, IVirtualDOMErrorOptions } from './virtual-dom-error-interface';

export function createVirtualDOMError(
  options?: IVirtualDOMErrorOptions
): IVirtualDOMError {
  const error: IVirtualDOMError = new Error(options?.message);
  error.name = 'VirtualDOMError';
  error.node = options?.node;
  return error;
}


