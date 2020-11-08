import { OBSERVABLE_PRIVATE_CONTEXT, TGenericObservableStruct } from '../observable-struct';
import { TraitObservableIsActive } from '../../traits/trait-observable-is-active';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitIsActiveForObservableStruct<GSelf extends TGenericObservableStruct> extends TraitObservableIsActive<GSelf> {
  isActive(this: GSelf): boolean {
    return this[OBSERVABLE_PRIVATE_CONTEXT].observers.length > 0;
  }
}
