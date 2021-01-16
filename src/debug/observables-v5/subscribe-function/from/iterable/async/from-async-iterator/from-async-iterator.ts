import { createNextNotification } from '../../../../../misc/notifications/built-in/next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../../../../misc/notifications/built-in/complete-notification';
import { createErrorNotification } from '../../../../../misc/notifications/built-in/error-notification';
import { IEmitFunction } from '../../../../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function';
import { IDefaultNotificationsUnion } from '../../../../../types/shared-types';

export type ISubscribeFunctionFromAsyncIteratorNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// export type ISubscribeFunctionFromAsyncIteratorNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;

export function fromAsyncIterator<GValue>(
  asyncIterator: AsyncIterator<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromAsyncIteratorNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromAsyncIteratorNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;

    (async (): Promise<void> => {
      while (running) {
        let result: IteratorResult<GValue>;
        try {
          result = await asyncIterator.next();
        } catch (error) {
          if (running) {
            emit(createErrorNotification(error));
          }
          return;
        }
        if (running) {
          if (result.done) {
            emit(STATIC_COMPLETE_NOTIFICATION);
            return;
          } else {
            emit(createNextNotification<GValue>(result.value));
          }
        }
      }
    })();

    return (): void => {
      running = false;
    };
  };
}