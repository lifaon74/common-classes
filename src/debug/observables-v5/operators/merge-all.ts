import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';
import { INextNotification } from '../misc/notifications/built-in/next-notification';
import { ICompleteNotification } from '../misc/notifications/built-in/complete-notification';
import { IErrorNotification } from '../misc/notifications/built-in/error-notification';


/**
 * WARN experimental and not properly working. DO NOT USE
 */

// export type IMergeAllInSubscribeFunctionNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;
//
// export type IMergeAllInSubscribeFunction<GValue> = ISubscribeFunction<IMergeAllInSubscribeFunctionNotifications<GValue>>

export function mergeAllOperator<GValue>(): IOperatorFunction<ISubscribeFunction<GValue>, GValue> {
  return (subscribe: ISubscribeFunction<ISubscribeFunction<GValue>>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      const unsubscribe = subscribe((childSubscribe: ISubscribeFunction<GValue>): void => {
        childrenUnsubscribeFunctions.push(childSubscribe(emit));
      });
      return () => {
        unsubscribe();
        for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
          childrenUnsubscribeFunctions[i]();
        }
      };
    };
  };
}


export type IMergeAllInNotifications<GValue> =
  INextNotification<ISubscribeFunction<IMergeAllOutNotifications<GValue>>>
  | ICompleteNotification
  | IErrorNotification
  ;

export type IMergeAllOutNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

// export type IMergeAllInSubscribeFunction<GValue> = ISubscribeFunction<IMergeAllInNotifications<GValue>>

export function mergeAllWithNotificationsOperator<GValue>(): IOperatorFunction<IMergeAllInNotifications<GValue>, IMergeAllOutNotifications<GValue>> {
  type GInNotificationsUnion = IMergeAllInNotifications<GValue>;
  type GOutNotificationsUnion = IMergeAllOutNotifications<GValue>;

  return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
    return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      let runningChildren: number = 0;
      let done: boolean = false;

      const end = () => {
        unsubscribe();
        for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
          childrenUnsubscribeFunctions[i]();
        }
      };

      const unsubscribe = subscribe((notification: GInNotificationsUnion): void => {

        switch (notification.name) {
          case 'next': {
            runningChildren++;
            const childSubscription: IUnsubscribeFunction = notification.value((notification: GOutNotificationsUnion) => {
              switch (notification.name) {
                case 'next': {
                  emit(notification);
                  break;
                }
                case 'complete': {
                  runningChildren--;
                  if (done && (runningChildren === 0)) {
                    end();
                    emit(notification);
                  }
                  break;
                }
                case 'error': {
                  end();
                  emit(notification);
                  break;
                }
              }
            });
            childrenUnsubscribeFunctions.push(childSubscription);
            break;
          }
          case 'complete': {
            done = true;
            if (runningChildren === 0) {
              end();
              emit(notification);
            }
            break;
          }
          case 'error': {
            end();
            emit(notification);
            break;
          }
        }

        // runningChildren++;
        // childrenUnsubscribeFunctions.push(
        //   childSubscribe((notification: GNotificationsUnion) => {
        //     switch (notification.name) {
        //       case 'next':
        //         emit(notification);
        //         break;
        //       case 'complete':
        //         runningChildren--;
        //         if (runningChildren === 0) {
        //           emit(notification);
        //         }
        //         break;
        //       case 'error':
        //         _reject(notification.value);
        //         break;
        //     }
        //
        //   })
        // );
      });

      return end;
    };
  };
}
