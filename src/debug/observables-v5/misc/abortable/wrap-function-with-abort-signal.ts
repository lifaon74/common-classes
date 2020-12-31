import { IOnAborted } from './wrap-promise-with-abort-signal';
import { TGenericFunction } from '@lifaon/traits';
import { createAbortError } from '../errors/abort-error/create-abort-error';


export type IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction extends TGenericFunction, GOnAborted extends IOnAborted> =
  ReturnType<GFunction>
  | ReturnType<GOnAborted>;

export interface IWrapFunctionWithAbortSignalReturnedFunction<GFunction extends TGenericFunction, GOnAborted extends IOnAborted> {
  (...args: Parameters<GFunction>): IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction, GOnAborted>;
}

export function wrapFunctionWithAbortSignal<// generics
  GFunction extends TGenericFunction,
  GOnAborted extends IOnAborted
  //
  >(
  callback: GFunction,
  signal: AbortSignal,
  onAborted: GOnAborted,
): IWrapFunctionWithAbortSignalReturnedFunction<GFunction, GOnAborted> {
  return (...args: Parameters<GFunction>): IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction, GOnAborted> => {
    return signal.aborted
      ? onAborted()
      : callback(...args);
  };
}

export function wrapFunctionWithAbortSignalAndThrow<GFunction extends TGenericFunction>(
  callback: GFunction,
  signal: AbortSignal,
): GFunction {
  return wrapFunctionWithAbortSignal<GFunction, () => never>(callback, signal, (): never => {
    throw createAbortError();
  }) as GFunction;
}

