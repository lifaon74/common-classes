import { TraitObservableRemoveObserver } from '../../../../../core/observable/traits/trait-observable-remove-observer';
import { IsNotificationsObserverLike, } from '../../../notifications-observer/notifications-observer-types';
import {
  INotificationsObservableStruct, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT
} from '../notifications-observable-struct';
import { Impl } from '@lifaon/traits';
import {
  TGenericStringKeyValueTupleUnion, TInferNotificationsObserversFromKeyValueTupleUnion
} from '../../notifications-observable-types';
import {
  TObservableInactiveKeyValueTuple, TObservableRemoveObserverKeyValueTuple
} from '../../../../../core/observable/built-in/simple/simple-observable-types';
import { ObservableWithEventListenerStructDispatch } from '../../../../../core/observable/with-events/functions/observable-with-event-listener-struct-dispatch';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../../verify-types';


@Impl()
export class ImplTraitRemoveObserverForNotificationsObservableStruct<// generics
  GSelf extends INotificationsObservableStruct<GKeyValueTupleUnion>,
  GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion
  //
  > extends TraitObservableRemoveObserver<GSelf, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>> {
  removeObserver(this: GSelf, observer: TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>): GSelf {
    type GObserver = TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>;
    if (DOT_NOT_VERIFY_TYPES || IsNotificationsObserverLike(observer)) {
      const observersMap: Map<string, GObserver[]> = this[NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT].observersMap;
      const name: string = observer.getName();
      if (observersMap.has(name)) {
        const observers: GObserver[] = observersMap.get(name) as GObserver[];
        const index: number = observers.indexOf(observer);

        if (index === -1) {
          throw new Error(`Doesn't contain this Observer`);
        } else {
          observers.splice(index, 1);
          ObservableWithEventListenerStructDispatch<GObserver, TObservableRemoveObserverKeyValueTuple<GObserver>, 'remove-observer'>(this, 'remove-observer', observer);
          if (observers.length === 0) {
            ObservableWithEventListenerStructDispatch<GObserver, TObservableInactiveKeyValueTuple, 'inactive'>(this, 'inactive', void 0);
          }
          return this;
        }
      } else {
        throw new Error(`Doesn't contain this Observer`);
      }
    } else {
      throw new TypeError(`Not a NotificationsObserver`);
    }
  }
}

