import { TGenericObservableLike } from '../observable/built-in/simple/simple-observable-types';
import { TraitTransformGetObservable, } from './traits/trait-transform-get-observable';
import { TraitTransformGetObserver, } from './traits/trait-transform-get-observer';
import { TGenericObserverLike } from '../observer/built-in/default/observer-types';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface ITransformLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends
  // traits
  TraitTransformGetObserver<any, GObserver>,
  TraitTransformGetObservable<any, GObservable>
  //
{
}

export type TGenericTransformLike = ITransformLike<TGenericObserverLike, TGenericObservableLike>;

export type TInferTransformLikeGObserver<GTransform extends TGenericTransformLike> =
  GTransform extends ITransformLike<infer GObserver, any>
    ? GObserver
    : never;

export type TInferTransformLikeGObservable<GTransform extends TGenericTransformLike> =
  GTransform extends ITransformLike<any, infer GObservable>
    ? GObservable
    : never;


export function IsTransformLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(value: any): value is ITransformLike<GObserver, GObservable> {
  return TraitIsImplementedBy(TraitTransformGetObserver, value)
    && TraitIsImplementedBy(TraitTransformGetObservable, value);
}
