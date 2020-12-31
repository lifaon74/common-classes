import { createNextNotification, INextNotification } from '../../../misc/notifications/built-in/next-notification';
import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';
import {
  ICompleteNotification, STATIC_COMPLETE_NOTIFICATION
} from '../../../misc/notifications/built-in/complete-notification';

export type ISubscribeFunctionFromArrayNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromArrayWithNotifications<GValue>(
  array: ArrayLike<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromArrayNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromArrayNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(createNextNotification<GValue>(array[i]));
    }
    if (running) {
      emit(STATIC_COMPLETE_NOTIFICATION);
    }
    return (): void => {
      running = false;
    };
  };
}
