import { IErrorOptions } from '../error-interface';

export interface IAbortError extends Error {
  signal?: AbortSignal;
}

export interface IAbortErrorOptions extends IErrorOptions {
  signal?: AbortSignal;
}


