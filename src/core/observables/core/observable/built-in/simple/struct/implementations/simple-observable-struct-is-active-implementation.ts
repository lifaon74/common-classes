import { ISimpleObservableStruct, SIMPLE_OBSERVABLE_PRIVATE_CONTEXT, } from '../simple-observable-struct';
import { TraitObservableIsActive } from '../../../../traits/trait-observable-is-active';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../../../observer/built-in/default/observer-types';

@Impl()
export class ImplTraitIsActiveForSimpleObservableStruct<GSelf extends ISimpleObservableStruct<TGenericObserverLike>> extends TraitObservableIsActive<GSelf> {
  isActive(this: GSelf): boolean {
    return this[SIMPLE_OBSERVABLE_PRIVATE_CONTEXT].observers.length > 0;
  }
}
