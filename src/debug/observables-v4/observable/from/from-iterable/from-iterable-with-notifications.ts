import { IObservable } from '../../../core/observable';
import { INextNotification } from '../../../misc/notifications/build-in/next-notification';
import { ICompleteNotification } from '../../../misc/notifications/build-in/complete-notification';
import { fromIteratorWithNotifications } from './from-iterator-with-notifications';

export type IObservableFromIterableNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromIterableWithNotifications<GValue>(iterable: Iterable<GValue>): IObservable<IObservableFromIterableNotifications<GValue>> {
  return fromIteratorWithNotifications<GValue>(iterable[Symbol.iterator]());
}
