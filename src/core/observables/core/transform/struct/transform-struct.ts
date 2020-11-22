import { TGenericObserverLike } from '../../observer/observer-types';
import { TGenericObservableLike } from '../../observable/observable-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const TRANSFORM_PRIVATE_CONTEXT: unique symbol = Symbol('transform-private-context');

export interface ITransformPrivateContext<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> {
  readonly observer: GObserver;
  readonly observable: GObservable;
}

/** STRUCT DEFINITION **/

export interface ITransformStruct<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> {
  readonly [TRANSFORM_PRIVATE_CONTEXT]: ITransformPrivateContext<GObserver, GObservable>;
}

export type TGenericTransformStruct = ITransformStruct<TGenericObserverLike, TGenericObservableLike>;

export function IsTransformStruct<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(value: any): value is ITransformStruct<GObserver, GObservable> {
  return IsObject(value)
    && HasProperty(value, TRANSFORM_PRIVATE_CONTEXT);
}
