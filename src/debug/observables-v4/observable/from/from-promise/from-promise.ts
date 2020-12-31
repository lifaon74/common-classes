import { createNextNotification, INextNotification } from '../../../misc/notifications/build-in/next-notification';
import { createCompleteNotification, ICompleteNotification } from '../../../misc/notifications/build-in/complete-notification';
import { createErrorNotification, IErrorNotification } from '../../../misc/notifications/build-in/error-notification';
import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

export type IObservableFromPromiseNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;


/**
 * Creates an Observable from a Promise
 * INFO: prefer to use fromPromiseWithAbortSignal to cancel any pending async job
 */
export function fromPromise<GValue>(
  promise: Promise<GValue>,
): IObservable<IObservableFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromPromiseNotifications<GValue>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            observer.emit(createNextNotification<GValue>(value));
          }
          if (running) {
            observer.emit(createCompleteNotification());
          }
        },
        (error: any) => {
          if (running) {
            observer.emit(createErrorNotification<any>(error));
          }
        }
      );
    return (): void => {
      running = false;
    };
  });
}
