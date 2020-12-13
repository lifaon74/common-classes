import { TraitObservableAddObserver } from '../../../../../core/observable/traits/trait-observable-add-observer';
import { IsNotificationsObserverLike, } from '../../../notifications-observer/notifications-observer-types';
import {
  INotificationsObservableStruct, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT
} from '../notifications-observable-struct';
import { Impl } from '@lifaon/traits';
import {
  TGenericStringKeyValueTupleUnion, TInferNotificationsObserversFromKeyValueTupleUnion
} from '../../notifications-observable-types';
import {
  TObservableActiveKeyValueTuple, TObservableAddObserverKeyValueTuple
} from '../../../../../core/observable/built-in/simple/simple-observable-types';
import { ObservableWithEventListenerStructDispatch } from '../../../../../core/observable/with-events/functions/observable-with-event-listener-struct-dispatch';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../../verify-types';


@Impl()
export class ImplTraitAddObserverForNotificationsObservableStruct<// generics
  GSelf extends INotificationsObservableStruct<GKeyValueTupleUnion>,
  GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion
  //
  > extends TraitObservableAddObserver<GSelf, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>> {
  addObserver(this: GSelf, observer: TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>): GSelf {
    type GObserver = TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>;
    if (DOT_NOT_VERIFY_TYPES || IsNotificationsObserverLike(observer)) {
      const observersMap: Map<string, GObserver[]> = this[NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT].observersMap;
      const name: string = observer.getName();
      let observers: GObserver[];
      if (observersMap.has(name)) {
        observers = observersMap.get(name) as GObserver[];
        if (observers.includes(observer)) {
          throw new TypeError(`Already observing this observer`);
        }
      } else {
        observers = [];
        observersMap.set(name, observers);
      }

      observers.push(observer);
      ObservableWithEventListenerStructDispatch<GObserver, TObservableAddObserverKeyValueTuple<GObserver>, 'add-observer'>(this, 'add-observer', observer);
      if (
        (observersMap.size === 1)
        && (observers.length === 1)
      ) {
        ObservableWithEventListenerStructDispatch<GObserver, TObservableActiveKeyValueTuple, 'active'>(this, 'active', void 0);
      }

      return this;
    } else {
      throw new TypeError(`Not a NotificationsObserver`);
    }
  }
}

