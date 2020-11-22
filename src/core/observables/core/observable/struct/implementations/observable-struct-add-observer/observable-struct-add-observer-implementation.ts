import { IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT } from '../../observable-struct';
import { TraitObservableAddObserver } from '../../../traits/trait-observable-add-observer';
import { IsObserverLike, TGenericObserverLike } from '../../../../observer/observer-types';
import { Impl } from '@lifaon/traits';
import { TObservableActiveKeyValueTuple, TObservableAddObserverKeyValueTuple } from '../../../observable-types';
import { ObservableStructDispatch } from '../../functions/observable-struct-dispatch';


@Impl()
export class ImplTraitAddObserverForObservableStruct<GSelf extends IObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableAddObserver<GSelf, GObserver> {
  addObserver(this: GSelf, observer: GObserver): GSelf {
    if (IsObserverLike(observer)) {
      const observers: GObserver[] = this[OBSERVABLE_PRIVATE_CONTEXT].observers;
      if (observers.includes(observer)) {
        throw new TypeError(`Already observing this observer`);
      } else {
        observers.push(observer);
        ObservableStructDispatch<GObserver, TObservableAddObserverKeyValueTuple<GObserver>, 'add-observer'>(this, 'add-observer', observer);
        if (observers.length === 1) {
          ObservableStructDispatch<GObserver, TObservableActiveKeyValueTuple, 'active'>(this, 'active', void 0);
        }
      }
      return this;
    } else {
      throw new TypeError(`Not an Observer`);
    }
  }
}
