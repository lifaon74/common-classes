import { IErrorOptions } from '../../observables-v5/misc/errors/error.type';
import { VirtualNode } from '../debug-virtual-dom';

export interface IVirtualDOMError extends Error {
  node?: VirtualNode;
}

export interface IVirtualDOMErrorOptions extends IErrorOptions {
  node?: VirtualNode;
}


