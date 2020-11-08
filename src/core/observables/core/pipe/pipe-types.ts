import { TGenericObservableLike, TInferObservableLikeGObserver } from '../observable/observable-types';
import { IActivableLike, IsActivableLike } from '../../../activable/activable-types';
import { TInferTraitGetObserverGObserver } from '../traits/trait-get-observer';
import { TInferTraitGetObservableGObservable } from '../traits/trait-get-observable';
import { TraitPipeGetObservable } from './traits/trait-pipe-get-observable';
import { TraitPipeGetObserver } from './traits/trait-pipe-get-observer';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface IPipeLike<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>> extends IActivableLike<IPipeLike<GObservable, GObserver>>,
  TraitPipeGetObservable<any, GObservable>,
  TraitPipeGetObserver<any, GObserver> {
}

export type TGenericPipeLike = IPipeLike<any, any>;

export type TInferPipeLikeGObservable<GPipeLike extends TGenericPipeLike> = TInferTraitGetObservableGObservable<GPipeLike>;
export type TInferPipeLikeGObserver<GPipeLike extends TGenericPipeLike> = TInferTraitGetObserverGObserver<GPipeLike>;

export function IsPipeLike<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>>(value: any): value is IPipeLike<GObservable, GObserver> {
  return TraitIsImplementedBy(TraitPipeGetObservable, value)
    && TraitIsImplementedBy(TraitPipeGetObserver, value)
    && IsActivableLike(value);
}
