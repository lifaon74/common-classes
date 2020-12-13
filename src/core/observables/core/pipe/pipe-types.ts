import { ISimpleObservableLike, TGenericObservableLike } from '../observable/built-in/simple/simple-observable-types';
import { IActivableLike, IsActivableLike } from '../../../activable/activable-types';
import { TraitPipeGetObservable } from './traits/trait-pipe-get-observable';
import { TraitPipeGetObserver } from './traits/trait-pipe-get-observer';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { TGenericObserverLike } from '../observer/built-in/default/observer-types';

export interface IPipeLike<GObservable extends ISimpleObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends
  // activable traits
  IActivableLike<IPipeLike<GObservable, GObserver>>,
  // own traits
  TraitPipeGetObservable<any, GObservable>,
  TraitPipeGetObserver<any, GObserver>
  //
{
}

export type TGenericPipeLike = IPipeLike<TGenericObservableLike, TGenericObserverLike>;

export function IsPipeLike<GObservable extends ISimpleObservableLike<GObserver>, GObserver extends TGenericObserverLike>(value: any): value is IPipeLike<GObservable, GObserver> {
  return IsActivableLike(value)
    && TraitIsImplementedBy(TraitPipeGetObservable, value)
    && TraitIsImplementedBy(TraitPipeGetObserver, value);
}
