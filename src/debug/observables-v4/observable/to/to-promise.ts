import { IObservable, IObservableUnsubscribeFunction } from '../../core/observable';
import { INextNotification } from '../../misc/notifications/build-in/next-notification';
import { ICompleteNotification } from '../../misc/notifications/build-in/complete-notification';
import { IErrorNotification } from '../../misc/notifications/build-in/error-notification';
import {
  createEventListener, IRemoveEventListener
} from '../../../observables-v5/misc/event-listener/create-event-listener';
import { isAbortSignal } from '../../../observables-v5/misc/abortable/is-abort-signal';
import { toTypedEventTarget } from '../../../observables-v5/misc/event-listener/to-typed-event-target';
import { createAbortError } from '../../misc/helpers/create-abort-error';
import { IAbortNotification } from '../../misc/notifications/build-in/abort-notification';
import { asyncUnsubscribe } from '../../misc/helpers/async-unsubscribe';
import { IGenericNotification } from '../../misc/notifications/notification-interface';

export interface IObservableToPromiseOptions {
  signal?: AbortSignal;
}

export type IObservableToPromiseNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  | IAbortNotification
  | IGenericNotification
  ;

export function toPromise<GValue>(
  observable: IObservable<IObservableToPromiseNotifications<GValue>>,
  options?: IObservableToPromiseOptions
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: GValue) => void,
    reject: (reason: any) => void,
  ) => {

    let removeAbortEventListener: IRemoveEventListener;
    if ((options !== void 0) && isAbortSignal(options.signal)) {
      if (options.signal.aborted) {
        return reject(createAbortError());
      } else {
        removeAbortEventListener = createEventListener<'abort', Event>(
          toTypedEventTarget(options.signal),
          'abort',
          () => {
            _reject(createAbortError());
          });
      }
    }

    const end = () => {
      if (removeAbortEventListener !== void 0) {
        removeAbortEventListener();
      }
      asyncUnsubscribe(() => unsubscribe);
    };

    const _resolve = (value: GValue) => {
      end();
      resolve(value);
    };

    const _reject = (error: any) => {
      end();
      reject(error);
    };

    let value: GValue;
    const unsubscribe: IObservableUnsubscribeFunction = observable
      .subscribe((notification: IObservableToPromiseNotifications<GValue>) => {
        switch (notification.name) {
          case 'next':
            value = notification.value;
            break;
          case 'complete':
            _resolve(value);
            break;
          case 'error':
          case 'abort':
            _reject(notification.value);
            break;
        }
      });
  });
}

