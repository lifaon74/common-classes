import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { TupleTypes } from '@lifaon/traits';
import { IObserver } from '../../../core/observer';
import { INextNotification } from '../../../misc/notifications/build-in/next-notification';
import { createCompleteNotification, ICompleteNotification } from '../../../misc/notifications/build-in/complete-notification';
import { IErrorNotification } from '../../../misc/notifications/build-in/error-notification';
import { IAbortNotification } from '../../../misc/notifications/build-in/abort-notification';


export type IConcatObservablesNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  | IAbortNotification
  ;

export interface IConcatObservables<GValue> extends IObservable<IConcatObservablesNotifications<GValue>> {
}

export type IGenericConcatObservables = IConcatObservables<any>;

export type IConcatObservablesValues<GObservables extends readonly IGenericConcatObservables[]> = TupleTypes<{
  [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<infer GValue>
    ? GValue
    : never;
}>;

/**
 * Creates an Observable which sequentially emits all values from given Observable and then moves on to the next.
 * INFO: provided 'observables' array MUST not change.
 */
export function concat<GObservables extends readonly IGenericConcatObservables[]>(
  observables: GObservables
): IObservable<IConcatObservablesValues<GObservables>> {
  type GNotificationsUnion = IConcatObservablesValues<GObservables>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let unsubscribe: IObservableUnsubscribeFunction;
    let index: number = -1;

    const next = () => {
      index++;
      if (index >= observables.length) {
        observer.emit(createCompleteNotification() as GNotificationsUnion);
      } else {
        const observable: IObservable<GNotificationsUnion> = observables[index] as IObservable<GNotificationsUnion>;
        unsubscribe = observable.subscribe((notification: GNotificationsUnion) => {
          switch (notification.name) {
            case 'next':
              observer.emit(notification.value);
              break;
            case 'complete':
              unsubscribe();
              next();
              break;
            case 'error':
            case 'abort':
              unsubscribe();
              observer.emit(notification);
              break;
          }
        });
      }
    };

    next();

    return (): void => {
      unsubscribe();
    };
  });
}
