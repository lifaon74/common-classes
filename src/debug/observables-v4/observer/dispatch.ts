import type { IObserver } from '../core/observer';
import type {
  IGenericNotification, TInferGValueFromNotificationsUnionAndName, TInferNotificationGName
} from '../misc/notifications/notification-interface';
import { createNotification } from '../misc/notifications/create-notification';

// function dispatch<GName extends string, GValue>(
//   observer: IObserver<INotification<GName, GValue>>,
//   name: GName,
//   value: GValue
// ): void {
//   observer.emit(new Notification<GName, GValue>(name, value));
// }


export function dispatch<GNotificationsUnion extends IGenericNotification, GName extends TInferNotificationGName<GNotificationsUnion>>(
  observer: IObserver<GNotificationsUnion>,
  name: GName,
  value: TInferGValueFromNotificationsUnionAndName<GNotificationsUnion, GName>,
): void {
  observer.emit(createNotification<GName, TInferGValueFromNotificationsUnionAndName<GNotificationsUnion, GName>>(name, value) as unknown as GNotificationsUnion);
}

// function dispatch<GName extends string, GValue,>(
//   observer: IObserver<INotification<GName, GValue> | TGenericNotification>,
//   name: GName,
//   value: GValue,
// ): void {
//   observer.emit(new Notification<GName, GValue>(name, value));
// }
