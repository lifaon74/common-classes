import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';
import { createNextNotification, INextNotification } from '../../../misc/notifications/build-in/next-notification';
import { createCompleteNotification, ICompleteNotification } from '../../../misc/notifications/build-in/complete-notification';

export type IObservableFromArrayNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromArrayWithNotifications<GValue>(array: ArrayLike<GValue>): IObservable<IObservableFromArrayNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromArrayNotifications<GValue>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      observer.emit(createNextNotification<GValue>(array[i]));
    }
    if (running) {
      observer.emit(createCompleteNotification());
    }
    return (): void => {
      running = false;
    };
  });
}
