import { TGenericObserverLike } from '../observer/observer-types';
import { TraitObservableIsActive } from './traits/trait-observable-is-active';
import {
  TInferTraitObservableAddObserverGObserver, TraitObservableAddObserver,
} from './traits/trait-observable-add-observer';
import { TraitObservableRemoveObserver } from './traits/trait-observable-remove-observer';
import { TraitIsImplementedBy } from '@lifaon/traits';


export interface IObservableLike<GObserver extends TGenericObserverLike> extends TraitObservableIsActive<any>,
  TraitObservableAddObserver<any, GObserver>,
  TraitObservableRemoveObserver<any, GObserver> {
}


export type TGenericObservableLike = IObservableLike<any>;

export type TInferObservableLikeGObserver<GObservableLike extends TGenericObservableLike> = TInferTraitObservableAddObserverGObserver<GObservableLike>;

export function IsObservableLike<GObserver extends TGenericObserverLike>(value: any): value is IObservableLike<GObserver> {
  return TraitIsImplementedBy(TraitObservableIsActive, value)
    && TraitIsImplementedBy(TraitObservableAddObserver, value)
    && TraitIsImplementedBy(TraitObservableRemoveObserver, value);
}


/** TYPES **/


export interface IObservableEventMap<GObserver extends TGenericObserverLike> {
  'add-observer': GObserver;
  'remove-observer': GObserver;
  'active': void;
  'inactive': void;
}


