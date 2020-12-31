import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';
import { createNextNotification, INextNotification } from '../../../misc/notifications/build-in/next-notification';
import { createCompleteNotification, ICompleteNotification } from '../../../misc/notifications/build-in/complete-notification';

export type IObservableFromIteratorNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromIteratorWithNotifications<GValue>(iterator: Iterator<GValue>): IObservable<IObservableFromIteratorNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromIteratorNotifications<GValue>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      observer.emit(createNextNotification<GValue>(result.value));
    }
    if (running) {
      observer.emit(createCompleteNotification());
    }
    return () => {
      running = false;
    };
  });
}
