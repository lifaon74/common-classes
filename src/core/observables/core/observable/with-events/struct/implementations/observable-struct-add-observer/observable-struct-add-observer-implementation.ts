import { IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT } from '../../observable-struct';
import { TraitObservableAddObserver } from '../../../../traits/trait-observable-add-observer';
import { IsObserverLike, TGenericObserverLike } from '../../../../../observer/built-in/default/observer-types';
import { Impl } from '@lifaon/traits';
import { TObservableActiveKeyValueTuple, TObservableAddObserverKeyValueTuple } from '../../../../built-in/simple/simple-observable-types';
import { ObservableWithEventListenerStructDispatch } from '../../../functions/observable-with-event-listener-struct-dispatch';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../../../verify-types';


@Impl()
export class ImplTraitAddObserverForObservableStruct<GSelf extends IObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableAddObserver<GSelf, GObserver> {
  addObserver(this: GSelf, observer: GObserver): GSelf {
    if (DOT_NOT_VERIFY_TYPES || IsObserverLike(observer)) {
      const observers: GObserver[] = this[OBSERVABLE_PRIVATE_CONTEXT].observers;
      if (observers.includes(observer)) {
        throw new TypeError(`Already observing this observer`);
      } else {
        observers.push(observer);
        ObservableWithEventListenerStructDispatch<GObserver, TObservableAddObserverKeyValueTuple<GObserver>, 'add-observer'>(this, 'add-observer', observer);
        if (observers.length === 1) {
          ObservableWithEventListenerStructDispatch<GObserver, TObservableActiveKeyValueTuple, 'active'>(this, 'active', void 0);
        }
      }
      return this;
    } else {
      throw new TypeError(`Not an Observer`);
    }
  }
}
