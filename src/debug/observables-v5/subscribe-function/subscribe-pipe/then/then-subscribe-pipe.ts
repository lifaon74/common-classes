import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';
import { IDefaultNotificationsUnion } from '../../../types/shared-types';
import { IGenericNotification } from '../../../misc/notifications/notification-interface';
import { IEmitFunction } from '../../../types/emit-function/emit-function';
import { toPromise } from '../../to/to-promise/to-promise';


export interface IThenSubscribePipeOnFulfilled<GInNextValue, GOut> {
  (value: GInNextValue): ISubscribeFunction<GOut>;
}

export interface IThenSubscribePipeOnRejected<GOut> {
  (error: any): ISubscribeFunction<GOut>;
}

export type IThenInNotifications<GInNextValue> =
  IDefaultNotificationsUnion<GInNextValue>
  | IGenericNotification
  ;


export function thenSubscribePipe<GInNextValue, GOut>(
  onFulfilled: IThenSubscribePipeOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenSubscribePipeOnRejected<GOut>,
): ISubscribePipeFunction<IThenInNotifications<GInNextValue>, GOut> {
  type GInNotificationsUnion = IThenInNotifications<GInNextValue>;
  return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      let running: boolean = true;

      const controller: AbortController = new AbortController();
      const signal: AbortSignal = controller.signal;

      let childUnsubscribe: IUnsubscribeFunction;

      toPromise<GInNextValue>(subscribe, { signal })
        .then(
          (value: GInNextValue) => {
            if (running) {
              childUnsubscribe = onFulfilled(value)(emit);
            }
          },
          (error: any) => {
            if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
              childUnsubscribe = onRejected(error)(emit);
            }
          },
        );

      return (): void => {
        if (running) {
          running = false;
          controller.abort();
          if (childUnsubscribe !== void 0) {
            childUnsubscribe();
          }
        }
      };
    };
  };
}

