import { TGenericObservableLike } from '../observable/observable-types';
import {
  TInferTraitTransformGetObservableGObservable, TraitTransformGetObservable,
} from './traits/trait-transform-get-observable';
import {
  TInferTraitTransformGetObserverGObserver, TraitTransformGetObserver,
} from './traits/trait-transform-get-observer';
import { TGenericObserverLike } from '../observer/observer-types';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface ITransformLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends TraitTransformGetObserver<any, GObserver>,
  TraitTransformGetObservable<any, GObservable> {
}

export type TGenericTransformLike = ITransformLike<TGenericObserverLike, TGenericObservableLike>;

export type TInferTransformLikeGObserver<GTransformLike extends TGenericTransformLike> = TInferTraitTransformGetObserverGObserver<GTransformLike>;
export type TInferTransformLikeGObservable<GTransformLike extends TGenericTransformLike> = TInferTraitTransformGetObservableGObservable<GTransformLike>;

export function IsTransformLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(value: any): value is ITransformLike<GObserver, GObservable> {
  return TraitIsImplementedBy(TraitTransformGetObserver, value)
    && TraitIsImplementedBy(TraitTransformGetObservable, value);
}
