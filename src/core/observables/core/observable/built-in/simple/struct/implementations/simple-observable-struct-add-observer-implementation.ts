import { ISimpleObservableStruct, SIMPLE_OBSERVABLE_PRIVATE_CONTEXT } from '../simple-observable-struct';
import { TraitObservableAddObserver } from '../../../../traits/trait-observable-add-observer';
import { TGenericObserverLike } from '../../../../../observer/built-in/default/observer-types';
import { Impl } from '@lifaon/traits';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../../../verify-types';
import { IsObserverLike } from '../../../../../observer/built-in/default/observer-like';


@Impl()
export class ImplTraitAddObserverForSimpleObservableStruct<GSelf extends ISimpleObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableAddObserver<GSelf, GObserver> {
  addObserver(this: GSelf, observer: GObserver): GSelf {
    if (DOT_NOT_VERIFY_TYPES || IsObserverLike(observer)) {
      const observers: GObserver[] = this[SIMPLE_OBSERVABLE_PRIVATE_CONTEXT].observers;
      if (observers.includes(observer)) {
        throw new TypeError(`Already observing this observer`);
      } else {
        observers.push(observer);
      }
      return this;
    } else {
      throw new TypeError(`Not an Observer`);
    }
  }
}
