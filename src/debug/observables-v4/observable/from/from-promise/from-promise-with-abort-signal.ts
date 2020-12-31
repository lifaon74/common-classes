import { createNextNotification, INextNotification } from '../../../misc/notifications/build-in/next-notification';
import {
  createCompleteNotification, ICompleteNotification
} from '../../../misc/notifications/build-in/complete-notification';
import { createErrorNotification, IErrorNotification } from '../../../misc/notifications/build-in/error-notification';
import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';
import {
  createEventListener, IRemoveEventListener
} from '../../../../observables-v5/misc/event-listener/create-event-listener';
import { isAbortSignal } from '../../../../observables-v5/misc/abortable/is-abort-signal';
import { createAbortNotification, IAbortNotification } from '../../../misc/notifications/build-in/abort-notification';
import { noop } from '../../../misc/helpers/noop';
import { toTypedEventTarget } from '../../../../observables-v5/misc/event-listener/to-typed-event-target';

export interface IObservableFromPromiseWithAbortSignalOptions {
  signal?: AbortSignal | null;
}

export type IObservableFromPromiseWithAbortSignalNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  | IAbortNotification<void>
  ;


export interface IFromPromiseWithAbortSignalCreatePromiseFunction<GValue> {
  (signal: AbortSignal): Promise<GValue>;
}

/**
 * Creates an observable from a 'create promise function'
 * This function is called immediately with an AbortSignal which should be used to abort any async job if the Observable is unsubscribed.
 * INFO: you may provide yourself an AbortSignal in the 'options'.
 *  - if this one is already aborted, the Observable emits an 'abort' notification, and 'createPromise' is never called
 *  - else, the 'signal' arguments of 'createPromise' is directly linked with the provided one.
 */
export function fromPromiseWithAbortSignal<GValue>(
  createPromise: IFromPromiseWithAbortSignalCreatePromiseFunction<GValue>,
  options?: IObservableFromPromiseWithAbortSignalOptions,
): IObservable<IObservableFromPromiseWithAbortSignalNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromPromiseWithAbortSignalNotifications<GValue>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let controller: AbortController;
    let removeAbortEventListener: IRemoveEventListener;
    let running: boolean = true;

    const end = () => {
      running = false;
      if (removeAbortEventListener !== void 0) {
        removeAbortEventListener();
      }
    };

    const next = (value: GValue) => {
      if (running) {
        observer.emit(createNextNotification<GValue>(value));
      }
    };

    const complete = () => {
      if (running) {
        end();
        observer.emit(createCompleteNotification());
      }
    };

    const error = (error: any) => {
      if (running) {
        end();
        observer.emit(createErrorNotification<any>(error));
      }
    };

    const abort = () => {
      if (running) {
        end();
        observer.emit(createAbortNotification<void>(void 0));
      }
    };

    if ((options !== void 0) && isAbortSignal(options.signal)) {
      if (options.signal.aborted) {
        abort();
        return noop;
      } else {
        controller = new AbortController();
        removeAbortEventListener = createEventListener<'abort', Event>(
          toTypedEventTarget(options.signal),
          'abort',
          abort
        );
      }
    } else {
      controller = new AbortController();
    }

    createPromise(controller.signal)
      .then(
        (value: GValue) => {
          next(value);
          complete();
        },
        error
      );

    return () => {
      if (running) {
        end();
        controller.abort();
      }
    };
  });
}
