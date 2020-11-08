import { TInferObservableStructGObserver } from '../../../../../core/observable/struct/observable-struct';
import { TraitObservableAddObserver } from '../../../../../core/observable/traits/trait-observable-add-observer';
import { TGenericNotificationObservableStructWithDispatch } from '../notification-observable-struct-types';
import {
  IsNotificationObserverLike, TGenericNotificationObserverLike,
} from '../../../notification-observer/notification-observer-types';
import { NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT } from '../notification-observable-struct';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitAddObserverForNotificationObservableStruct<GSelf extends TGenericNotificationObservableStructWithDispatch> extends TraitObservableAddObserver<GSelf, TInferObservableStructGObserver<GSelf>> {
  addObserver(this: GSelf, observer: TInferObservableStructGObserver<GSelf>): GSelf {
    if (IsNotificationObserverLike(observer)) {
      const observersMap: Map<string, TGenericNotificationObserverLike[]> = this[NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT].observersMap;
      const name: string = observer.getName();
      let observers: TGenericNotificationObserverLike[];
      if (observersMap.has(name)) {
        observers = observersMap.get(name) as TGenericNotificationObserverLike[];
      } else {
        observers = [];
        observersMap.set(name, observers);
      }
      observers.push(observer);
      return this;
    } else {
      throw new TypeError(`Not a NotificationObserver`);
    }
  }
}

