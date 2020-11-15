import { TKeyValueTuple, TraitIsImplementedBy } from '@lifaon/traits';
import { TraitAdvancedAbortSignalIsAborted } from './traits/trait-advanced-abort-signal-is-aborted';
import { TraitAdvancedAbortSignalGetReason } from './traits/trait-advanced-abort-signal-get-reason';

export interface IAdvancedAbortSignalLike extends TraitAdvancedAbortSignalIsAborted<any>,
  TraitAdvancedAbortSignalGetReason<any> {
}

export type TGenericAdvancedAbortSignalLike = IAdvancedAbortSignalLike;


export function IsAdvancedAbortSignalLike(value: any): value is IAdvancedAbortSignalLike {
  return TraitIsImplementedBy(TraitAdvancedAbortSignalGetReason, value)
    && TraitIsImplementedBy(TraitAdvancedAbortSignalIsAborted, value);
}


// /** TYPES **/
//
// export type TIsUndefined<T> = [T] extends [(undefined | void)] ? true : false;
// export type TIsUnknown<T> = [unknown] extends [T] ? true : false;
// export type TIsUnknownOrUndefined<T> = true extends TIsUnknown<T>
//   ? true
//   : TIsUndefined<T>;
//
// export type TDefaultType<GValue, GDefault> =
//   true extends TIsUnknownOrUndefined<GValue>
//     ? GDefault
//     : GValue;
//
// // const a: TIsUndefined<void>;
// // const a: TIsUndefined<void | 'a'>;
// // const a: TIsUndefined<void | undefined>;
// // const a: TIsUndefined<unknown>;
// // const a: TIsUnknown<unknown>;
// // const a: TIsUnknown<unknown | 'a'>;
// // const a: TIsUnknown<'a'>;
// // const a: TIsUnknownOrUndefined<'a'>;
// // const a: TIsUnknownOrUndefined<unknown>;
// // const a: TIsUnknownOrUndefined<void>;
//

/** TYPES **/

export type TAdvancedAbortSignalAbortFunction = (reason: any) => void;

export type TAdvancedAbortSignalCreateFunction = (abort: TAdvancedAbortSignalAbortFunction) => void;


// export interface IAdvancedAbortSignalEventMap {
//   'abort': any;
// }

export type TAdvancedAbortSignalKeyValueTupleUnion = TKeyValueTuple<'abort', any>;


/* WRAP FUNCTION */

// // infers the return type of the 'wrapFunction' of an an AdvancedAbortSignal
// export type TInferAdvancedAbortSignalWrapFunctionReturn<GCallback extends TGenericFunction, GStrategy extends TAbortStrategy, GAborted> =
//   (...args: Parameters<GCallback>) => TInferAbortStrategyReturnedPromise<TInferNativePromiseLikeOrValue<ReturnType<GCallback>>, GStrategy, GAborted>;
//
