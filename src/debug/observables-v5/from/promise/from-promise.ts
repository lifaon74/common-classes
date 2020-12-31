import { createNextNotification } from '../../misc/notifications/built-in/next-notification';
import { STATIC_COMPLETE_NOTIFICATION } from '../../misc/notifications/built-in/complete-notification';
import { createErrorNotification } from '../../misc/notifications/built-in/error-notification';
import { IDefaultNotificationsUnion, IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';

export type ISubscribeFunctionFromPromiseNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// export type ISubscribeFunctionFromPromiseNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;


/**
 * Creates an SubscribeFunction from a Promise
 * INFO: prefer to use fromPromiseWithAbortSignal to cancel any pending async job
 */
export function fromPromise<GValue>(
  promise: Promise<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromPromiseNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            emit(createNextNotification<GValue>(value));
          }
          if (running) {
            emit(STATIC_COMPLETE_NOTIFICATION);
          }
        },
        (error: any) => {
          if (running) {
            emit(createErrorNotification<any>(error));
          }
        }
      );
    return (): void => {
      running = false;
    };
  };
}
