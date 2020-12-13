import {
  TGenericStringKeyValueTupleUnion, TInferNotificationsObserversFromKeyValueTupleUnion
} from '../../notifications-observable-types';
import {
  INotificationsObservableStruct, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT
} from '../notifications-observable-struct';
import { TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey } from '@lifaon/traits';


export function NotificationsObservableStructEmitAll<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion, GName extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  notificationObservableStruct: INotificationsObservableStruct<GKeyValueTupleUnion>,
  name: GName,
  value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GName>
): void {
  type GObserver = TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>;
  const observersMap: Map<string, GObserver[]> = notificationObservableStruct[NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT].observersMap;
  const observers: GObserver[] | undefined = observersMap.get(name);
  if (observers !== void 0) {
    for (let i = 0, l = observers.length; i < l; i++) {
      observers[i].emitValue(value);
    }
  }
}


// export function NotificationsObservableStructEmitAll<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion>(
//   notificationObservableStruct: INotificationsObservableStruct<GKeyValueTupleUnion>,
//   notification: TInferNotificationsFromKeyValueTupleUnion<GKeyValueTupleUnion>,
// ): void {
//   type GObserver = TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>;
//   const observersMap: Map<string, GObserver[]> = notificationObservableStruct[NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT].observersMap;
//   const observers: GObserver[] | undefined = observersMap.get(notification.getName());
//   if (observers !== void 0) {
//     for (let i = 0, l = observers.length; i < l; i++) {
//       observers[i].emitValue(notification.getValue());
//     }
//   }
// }

