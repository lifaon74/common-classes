import { TGenericObserverLike, TInferObserverLikeGValue } from '../observer/observer-types';
import { TraitObservableIsActive } from './traits/trait-observable-is-active';
import { TraitObservableAddObserver, } from './traits/trait-observable-add-observer';
import { TraitObservableRemoveObserver } from './traits/trait-observable-remove-observer';
import { TKeyValueTuple, TraitIsImplementedBy } from '@lifaon/traits';
import { IObservable } from './class/observable-class';


export interface IObservableLike<GObserver extends TGenericObserverLike> extends
  // traits
  TraitObservableIsActive<any>,
  TraitObservableAddObserver<any, GObserver>,
  TraitObservableRemoveObserver<any, GObserver>
  //
{
}

export type TGenericObservableLike = IObservableLike<TGenericObserverLike>;

export type TInferObservableLikeGObserver<GObservable extends TGenericObservableLike> =
  GObservable extends IObservableLike<infer GObserver>
    ? GObserver
    : never;

export function IsObservableLike<GObserver extends TGenericObserverLike>(value: any): value is IObservableLike<GObserver> {
  return TraitIsImplementedBy(TraitObservableIsActive, value)
    && TraitIsImplementedBy(TraitObservableAddObserver, value)
    && TraitIsImplementedBy(TraitObservableRemoveObserver, value);
}


/** TYPES **/


export type TObservableEmitFunction<GValue> = (value: GValue) => void;

export type TInferObservableEmitFunctionFromObserver<GObserver extends TGenericObserverLike> = TObservableEmitFunction<TInferObserverLikeGValue<GObserver>>;

export type TObservableCreateFunction<GObserver extends TGenericObserverLike> = (emit: TInferObservableEmitFunctionFromObserver<GObserver>, observable: IObservable<GObserver>) => void;


// export interface IObservableEventMap<GObserver extends TGenericObserverLike> {
//   'add-observer': GObserver;
//   'remove-observer': GObserver;
//   'active': void;
//   'inactive': void;
// }

export type TObservableAddObserverKeyValueTuple<GObserver extends TGenericObserverLike> = TKeyValueTuple<'add-observer', GObserver>;
export type TObservableRemoveObserverKeyValueTuple<GObserver extends TGenericObserverLike> = TKeyValueTuple<'remove-observer', GObserver>;
export type TObservableActiveKeyValueTuple = TKeyValueTuple<'active', void>;
export type TObservableInactiveKeyValueTuple = TKeyValueTuple<'inactive', void>;

export type TObservableKeyValueTupleUnion<GObserver extends TGenericObserverLike> =
  TObservableAddObserverKeyValueTuple<GObserver>
  | TObservableRemoveObserverKeyValueTuple<GObserver>
  | TObservableActiveKeyValueTuple
  | TObservableInactiveKeyValueTuple;

export type TGenericObservableKeyValueTupleUnion = TObservableKeyValueTupleUnion<TGenericObserverLike>;

