import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';
import { IEmitFunction } from '../../../../types/emit-function/emit-function';
import { IDefaultNotificationsUnion } from '../../../../types/shared-types';
import { IGenericNotification } from '../../../../misc/notifications/notification-interface';
import { ICompleteNotification } from '../../../../misc/notifications/built-in/complete-notification';
import { IErrorNotification } from '../../../../misc/notifications/built-in/error-notification';
import { INextNotification } from '../../../../misc/notifications/built-in/next-notification';

export type IMergeAllInNotifications<GValue> =
  IDefaultNotificationsUnion<ISubscribeFunction<IDefaultNotificationsUnion<GValue>>>
  // | IGenericNotification
  ;

export type IMergeAllOutNotifications<GValue> = IDefaultNotificationsUnion<GValue>;

// TODO

export function mergeAllWithNotificationsSubscribeFunction<GValue>(): ISubscribePipeFunction<IMergeAllInNotifications<GValue>, IMergeAllOutNotifications<GValue>> {
  type GInNotificationsUnion = IMergeAllInNotifications<GValue>;
  type GOutNotificationsUnion = IMergeAllOutNotifications<GValue>;

  return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
    return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
      let running: boolean = true;
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      let runningChildren: number = 0;
      let done: boolean = false;

      const end = () => {
        if (!running) {
          running = false;
          unsubscribe();
          for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
            childrenUnsubscribeFunctions[i]();
          }
        }
      };

      const unsubscribe = subscribe((notification: GInNotificationsUnion): void => {
        switch (notification.name) {
          case 'next': {
            runningChildren++;
            let childDone: boolean = false;
            const childSubscription: IUnsubscribeFunction = notification.value((notification: GOutNotificationsUnion) => {
              switch (notification.name) {
                case 'next': {
                  emit(notification);
                  break;
                }
                case 'complete': {
                  childDone = true;
                  runningChildren--;
                  if (done && (runningChildren === 0)) {
                    end();
                    emit(notification);
                  } else  if (typeof childSubscription !== 'undefined') {
                     childrenUnsubscribeFunctions.splice(childrenUnsubscribeFunctions.indexOf(childSubscription), 1);
                   }
                  break;
                }
                case 'error': {
                  childDone = true;
                  end();
                  emit(notification);
                  break;
                }
              }
            });
            if (!childDone) {
              childrenUnsubscribeFunctions.push(childSubscription);
            }
            break;
          }
          case 'complete': {
            done = true;
            if (runningChildren === 0) {
              end();
              emit(notification as ICompleteNotification);
            }
            break;
          }
          case 'error': {
            end();
            emit(notification as IErrorNotification);
            break;
          }
        }
      });

      return end;
    };
  };
}

