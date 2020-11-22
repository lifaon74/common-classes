import { TraitObserverEmit } from './traits/trait-observer-emit';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface IObserverLike<GValue> extends TraitObserverEmit<any, GValue> {
}

export type TGenericObserverLike = IObserverLike<any>;

export type TInferObserverLikeGValue<GObserver extends TGenericObserverLike> =
  GObserver extends IObserverLike<infer GValue>
    ? GValue
    : never;

export function IsObserverLike<GValue>(value: any): value is IObserverLike<GValue> {
  return TraitIsImplementedBy(TraitObserverEmit, value);
}


/** TYPES **/

export type TObserverEmitFunction<GValue> = (value: GValue) => void;
