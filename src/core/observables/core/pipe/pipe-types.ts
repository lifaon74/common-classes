import { IObservableLike, TGenericObservableLike } from '../observable/observable-types';
import { IActivableLike, IsActivableLike } from '../../../activable/activable-types';
import { TraitPipeGetObservable } from './traits/trait-pipe-get-observable';
import { TraitPipeGetObserver } from './traits/trait-pipe-get-observer';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { TGenericObserverLike } from '../observer/observer-types';

export interface IPipeLike<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends
  // activable traits
  IActivableLike<IPipeLike<GObservable, GObserver>>,
  // own traits
  TraitPipeGetObservable<any, GObservable>,
  TraitPipeGetObserver<any, GObserver>
  //
{
}

export type TGenericPipeLike = IPipeLike<TGenericObservableLike, TGenericObserverLike>;

export function IsPipeLike<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike>(value: any): value is IPipeLike<GObservable, GObserver> {
  return TraitIsImplementedBy(TraitPipeGetObservable, value)
    && TraitIsImplementedBy(TraitPipeGetObserver, value)
    && IsActivableLike(value);
}
