import { Impl } from '@lifaon/traits';
import { ISimpleObservableStruct, SIMPLE_OBSERVABLE_PRIVATE_CONTEXT } from '../simple-observable-struct';
import { TraitObservableRemoveObserver } from '../../../../traits/trait-observable-remove-observer';
import { TGenericObserverLike } from '../../../../../observer/built-in/default/observer-types';

@Impl()
export class ImplTraitRemoveObserverForSimpleObservableStruct<GSelf extends ISimpleObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableRemoveObserver<GSelf, GObserver> {
  removeObserver(this: GSelf, observer: GObserver): GSelf {
    const observers: GObserver[] = this[SIMPLE_OBSERVABLE_PRIVATE_CONTEXT].observers;
    const index: number = observers.indexOf(observer);
    if (index === -1) {
      throw new Error(`Doesn't contain this Observer`);
    } else {
      observers.splice(index, 1);
      return this;
    }
  }
}
