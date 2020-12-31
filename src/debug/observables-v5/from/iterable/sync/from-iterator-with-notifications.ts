import { createNextNotification, INextNotification } from '../../../misc/notifications/built-in/next-notification';
import {
  ICompleteNotification, STATIC_COMPLETE_NOTIFICATION
} from '../../../misc/notifications/built-in/complete-notification';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';

export type ISubscribeFunctionFromIteratorNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

/**
 * WARN use with caution: it's possible that you subscribe twice to the same Iterator, in this case the emitted values probably won't be what you expect
 */
export function fromIteratorWithNotifications<GValue>(
  iterator: Iterator<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromIteratorNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromIteratorNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      emit(createNextNotification<GValue>(result.value));
    }
    if (running) {
      emit(STATIC_COMPLETE_NOTIFICATION);
    }
    return () => {
      running = false;
    };
  };
}
