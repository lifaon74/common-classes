import { TGenericObservableLike, TInferObservableLikeGObserver } from '../observable/observable-types';
import { IActivableLike, IsActivableLike } from '../../../activable/activable-types';
import { TInferTraitGetObservableGObservable } from '../traits/trait-get-observable';
import { TraitPipeThroughGetObservable } from './traits/trait-pipe-through-get-observable';
import { ITransformLike, TInferTransformLikeGObservable } from '../transform/transform-types';
import { TGenericObservableLikeWithEventListenerOn } from './struct/implementations/pipe-through-struct-activate-implementation';
import { TraitIsImplementedBy } from '@lifaon/traits';

export type TPipeThroughLikeGTransformConstraint<GObservable extends TGenericObservableLike> = ITransformLike<TInferObservableLikeGObserver<GObservable>, TGenericObservableLike>;

export interface IPipeThroughLike<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>> extends IActivableLike<IPipeThroughLike<GObservable, GTransform>>,
  TraitPipeThroughGetObservable<any, TInferTransformLikeGObservable<GTransform>> {
}

export type TGenericPipeThroughLike = IPipeThroughLike<any, any>;

export type TInferPipeThroughLikeGObservable<GPipeThroughLike extends TGenericPipeThroughLike> = TInferTraitGetObservableGObservable<GPipeThroughLike>;

export function IsPipeThroughLike<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>>(value: any): value is IPipeThroughLike<GObservable, GTransform> {
  return TraitIsImplementedBy(TraitPipeThroughGetObservable, value)
    && IsActivableLike(value);
}

/** TYPES **/

export type TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable extends TGenericObservableLike> = ITransformLike<TInferObservableLikeGObserver<GObservable>, TGenericObservableLikeWithEventListenerOn>;
