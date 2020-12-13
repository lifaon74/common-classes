import { ISimpleObservableLike, TGenericObservableLike } from '../../observable/built-in/simple/simple-observable-types';
import { HasProperty, IsObject } from '@lifaon/traits';
import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';

/** PRIVATE CONTEXT **/

export const PIPE_PRIVATE_CONTEXT: unique symbol = Symbol('pipe-private-context');

export interface IPipePrivateContext<GObservable extends ISimpleObservableLike<GObserver>, GObserver extends TGenericObserverLike> {
  readonly observable: GObservable;
  readonly observer: GObserver;
  activated: boolean;
}

export type TGenericPipePrivateContext = IPipePrivateContext<TGenericObservableLike, TGenericObserverLike>;


/** STRUCT DEFINITION **/

export interface IPipeStruct<GObservable extends ISimpleObservableLike<GObserver>, GObserver extends TGenericObserverLike> {
  readonly [PIPE_PRIVATE_CONTEXT]: IPipePrivateContext<GObservable, GObserver>;
}

export type TGenericPipeStruct = IPipeStruct<TGenericObservableLike, TGenericObserverLike>;

export function IsPipeStruct<GObservable extends ISimpleObservableLike<GObserver>, GObserver extends TGenericObserverLike>(value: any): value is IPipeStruct<GObservable, GObserver> {
  return IsObject(value)
    && HasProperty(value, PIPE_PRIVATE_CONTEXT);
}
