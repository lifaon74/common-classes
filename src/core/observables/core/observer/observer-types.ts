import { TInferTraitObserverEmitGValue, TraitObserverEmit } from './traits/trait-observer-emit';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface IObserverLike<GValue> extends TraitObserverEmit<any, GValue> {
}

export type TGenericObserverLike = IObserverLike<any>;

export type TInferObserverLikeGValue<GObserverLike extends TGenericObserverLike> = TInferTraitObserverEmitGValue<GObserverLike>;

export function IsObserverLike<GValue>(value: any): value is IObserverLike<GValue> {
  return TraitIsImplementedBy(TraitObserverEmit, value);
}


/** TYPES **/

export type TObserverEmitFunction<GValue> = (value: GValue) => void;
