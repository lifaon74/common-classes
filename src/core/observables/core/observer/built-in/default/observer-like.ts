import { TraitObserverEmit } from '../../traits/trait-observer-emit';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface IObserverLike<GValue> extends
  // traits
  TraitObserverEmit<any, GValue>
  //
{
}

export function IsObserverLike<GValue>(value: any): value is IObserverLike<GValue> {
  return TraitIsImplementedBy(TraitObserverEmit, value);
}

