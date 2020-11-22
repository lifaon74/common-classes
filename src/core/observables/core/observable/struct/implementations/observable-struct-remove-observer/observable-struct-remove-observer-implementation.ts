import { TGenericObserverLike } from '../../../../observer/observer-types';
import { Impl } from '@lifaon/traits';
import { IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT } from '../../observable-struct';
import { ObservableStructDispatch } from '../../functions/observable-struct-dispatch';
import { TObservableInactiveKeyValueTuple, TObservableRemoveObserverKeyValueTuple } from '../../../observable-types';
import { TraitObservableRemoveObserver } from '../../../traits/trait-observable-remove-observer';


@Impl()
export class ImplTraitRemoveObserverForObservableStruct<GSelf extends IObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableRemoveObserver<GSelf, GObserver> {
  removeObserver(this: GSelf, observer: GObserver): GSelf {
    const observers: GObserver[] = this[OBSERVABLE_PRIVATE_CONTEXT].observers;
    const index: number = observers.indexOf(observer);
    if (index === -1) {
      throw new Error(`Doesn't contain this Observer`);
    } else {
      observers.splice(index, 1);
      ObservableStructDispatch<GObserver, TObservableRemoveObserverKeyValueTuple<GObserver>, 'remove-observer'>(this, 'remove-observer', observer);
      if (observers.length === 0) {
        ObservableStructDispatch<GObserver, TObservableInactiveKeyValueTuple, 'inactive'>(this, 'inactive', void 0);
      }
    }
    return this;
  }
}
