import type { IObserver } from '../core/observer';
import type {
  IGenericNotification, INotification, TInferNotificationGName, TInferNotificationGValue
} from '../notifications/notification-interface';
import { createNotification } from '../notifications/create-notification';

// function dispatch<GName extends string, GValue>(
//   observer: IObserver<INotification<GName, GValue>>,
//   name: GName,
//   value: GValue
// ): void {
//   observer.emit(new Notification<GName, GValue>(name, value));
// }


export type TInferGValueFromNotificationsUnionAndName<GNotificationsUnion extends IGenericNotification, GName extends TInferNotificationGName<GNotificationsUnion>>
  = TInferNotificationGValue<Extract<GNotificationsUnion, INotification<GName, any>>>;

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
