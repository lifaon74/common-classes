import { IVirtualDOMError } from './virtual-dom-error-interface';

export function isVirtualDOMError(value: any): value is IVirtualDOMError {
  return value.name === 'VirtualDOMError';
}

