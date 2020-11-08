import { TGenericObservableLike, TInferObservableLikeGObserver } from '../../observable/observable-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const PIPE_PRIVATE_CONTEXT: unique symbol = Symbol('pipe-private-context');

export interface IPipePrivateContext<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>> {
  readonly observable: GObservable;
  readonly observer: GObserver;
  activated: boolean;
}

export type TPipePrivateContextFromGSelf<GSelf extends TGenericPipeStruct> = IPipePrivateContext<TInferPipeStructGObservable<GSelf>, TInferPipeStructGObserver<GSelf>>;


/** STRUCT DEFINITION **/

export interface IPipeStruct<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>> {
  readonly [PIPE_PRIVATE_CONTEXT]: IPipePrivateContext<GObservable, GObserver>;
}

export type TGenericPipeStruct = IPipeStruct<any, any>;

export type TInferPipeStructGObservable<GPipeStruct extends TGenericPipeStruct> =
  GPipeStruct extends IPipeStruct<infer GObservable, any>
    ? GObservable
    : never;

export type TInferPipeStructGObserver<GPipeStruct extends TGenericPipeStruct> =
  GPipeStruct extends IPipeStruct<infer GObservable, infer GObserver>
    ? (
      GObserver extends TInferObservableLikeGObserver<GObservable>
        ? GObserver
        : never
      )
    : never;

export function IsPipeStruct<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>>(value: any): value is IPipeStruct<GObservable, GObserver> {
  return IsObject(value)
    && HasProperty(value, PIPE_PRIVATE_CONTEXT);
}
