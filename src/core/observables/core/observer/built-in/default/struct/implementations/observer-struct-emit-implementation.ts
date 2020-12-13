import { IObserverStruct, OBSERVER_PRIVATE_CONTEXT } from '../observer-struct';
import { TraitObserverEmit } from '../../../../traits/trait-observer-emit';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitEmitForObserverStruct<GSelf extends IObserverStruct<GValue>, GValue> extends TraitObserverEmit<GSelf, GValue> {
  emit(this: GSelf, value: GValue): void {
    this[OBSERVER_PRIVATE_CONTEXT].emit(value);
  }
}
