import { IOnAborted } from './wrap-promise-with-abort-signal';
import { TGenericFunction } from '@lifaon/traits';
import { createAbortError } from '../errors/abort-error/create-abort-error';
import { isNull } from '../helpers/is-type/is-null';


export type IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction extends TGenericFunction, GOnAborted extends IOnAborted> =
  ReturnType<GFunction>
  | ReturnType<GOnAborted>;

export interface IWrapFunctionWithAbortSignalReturnedFunction<GFunction extends TGenericFunction, GOnAborted extends IOnAborted> {
  (...args: Parameters<GFunction>): IWrapFunctionWithAbortSignalReturnedFunctionReturn<GFunction, GOnAborted>;
}

/**
 * Wraps a function with an AbortSignal:
 * - returns a function with the same arguments and the same return type (+ OnAborted type)
 * - when called, if the signal is aborted, calls and returns 'onAborted', else, calls and returns 'callback'
 */
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

/**
 * Wraps a function with an AbortSignal:
 * - when called, throws if the signal is aborted
 */
export function wrapFunctionWithAbortSignalAndThrow<GFunction extends TGenericFunction>(
  callback: GFunction,
  signal: AbortSignal,
): GFunction {
  return wrapFunctionWithAbortSignal<GFunction, () => never>(callback, signal, (): never => {
    throw createAbortError();
  }) as GFunction;
}

/*-------------*/

export function wrapFunctionWithOptionalAbortSignalAndThrow<GFunction extends TGenericFunction>(
  callback: GFunction,
  signal: AbortSignal | null | undefined,
): GFunction {
  if (isNull(signal)) {
    return callback;
  } else {
    return wrapFunctionWithAbortSignal<GFunction, () => never>(callback, signal, (): never => {
      throw createAbortError();
    }) as GFunction;
  }
}
