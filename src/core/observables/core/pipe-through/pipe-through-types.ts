import {
  TGenericObservableLike, TInferObservableLikeGObserver, TObservableActiveKeyValueTuple,
  TObservableInactiveKeyValueTuple, TObservableKeyValueTupleUnion
} from '../observable/built-in/simple/simple-observable-types';
import { IActivableLike, IsActivableLike } from '../../../activable/activable-types';
import { TraitPipeThroughGetPipe } from './traits/trait-pipe-through-get-pipe';
import { TraitEventListenerOn, TraitIsImplementedBy } from '@lifaon/traits';
import { TraitPipeThroughGetObservable } from './traits/trait-pipe-through-get-observable';
import { IPipeLike, TGenericPipeLike } from '../pipe/pipe-types';
import { ITransformLike, TInferTransformLikeGObservable } from '../transform/transform-types';
import { TGenericObserverLike } from '../observer/built-in/default/observer-types';


export interface IPipeThroughLike<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLike
  //
  > extends
  // activable traits
  IActivableLike<IPipeThroughLike<GPipe, GObservable>>,
  // own traits
  TraitPipeThroughGetPipe<any, GPipe>,
  TraitPipeThroughGetObservable<any, GObservable>
  //
{
}

export type TGenericPipeThroughLike = IPipeThroughLike<TGenericPipeLike, TGenericObservableLike>;

export function IsPipeThroughLike<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLike
  //
  >(value: any): value is IPipeThroughLike<GPipe, GObservable> {
  return IsActivableLike(value)
    && TraitIsImplementedBy(TraitPipeThroughGetPipe, value)
    && TraitIsImplementedBy(TraitPipeThroughGetObservable, value);
}

/** TYPES **/

export type TObservableActiveAndInactiveKeyValueTupleUnion =
  TObservableActiveKeyValueTuple
  | TObservableInactiveKeyValueTuple;


// INFO inaccurate, but typescript has an issue
// const a: IObservable<IObserverLike<any>>;
// const b: (typeof a extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive ? true : false); // true OK
// const b: (typeof a extends TraitEventListenerOn<any, TObservableActiveAndInactiveKeyValueTupleUnion> ? true : false);  // false WTF
// const b: (typeof a extends TraitEventListenerOn<any, TObservableKeyValueTupleUnion<TGenericObserverLike>> ? true : false); // true OK
//
export interface TGenericObservableLikeWithEventListenerOnForActiveAndInactive extends TGenericObservableLike, TraitEventListenerOn<any, TObservableKeyValueTupleUnion<TGenericObserverLike>> {
}
// INFO better
// export interface TGenericObservableLikeWithEventListenerOnForActiveAndInactive extends TGenericObservableLike, TraitEventListenerOn<any, TObservableActiveAndInactiveKeyValueTupleUnion> {
// }

export type TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable extends TGenericObservableLike> = ITransformLike<TInferObservableLikeGObserver<GObservable>, TGenericObservableLikeWithEventListenerOnForActiveAndInactive>;


export type TInferPipeThroughLikeFromObservableAndTransform<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>> =
  IPipeThroughLike<IPipeLike<GObservable, TInferObservableLikeGObserver<GObservable>>, TInferTransformLikeGObservable<GTransform>>;

// export type TGenericPipeThroughLikeWithGenericObservableLikeWithEventListenerOnForActiveAndInactive = IPipeThroughLike<TGenericPipeLike, TGenericObservableLikeWithEventListenerOnForActiveAndInactive>;



