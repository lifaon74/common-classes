import { createEventListener, IRemoveEventListener } from '../event-listener/create-event-listener';
import { toTypedEventTarget } from '../event-listener/to-typed-event-target';
import { createAbortError } from '../errors/abort-error/create-abort-error';

export interface IOnFulfilled<GValue> {
  (value: GValue): void;
}

export interface IOnRejected {
  (error: any): void;
}

export interface IOnAborted {
  (): void;
}

export function awaitPromiseFactoryWithAbortSignal<GValue>(
  promiseFactory: (signal: AbortSignal) => Promise<GValue>,
  signal: AbortSignal,
  onFulfilled: IOnFulfilled<GValue>,
  onRejected: IOnRejected,
  onAborted: IOnAborted,
): void {
  if (signal.aborted) {
    onAborted();
  } else {
    let running: boolean = true;

    const end = () => {
      running = false;
      removeAbortEventListener();
    };

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', Event>(
      toTypedEventTarget(signal),
      'abort',
      () => {
        end();
        onAborted();
      }
    );

    promiseFactory(signal)
      .then(
        (value: GValue) => {
          if (running) {
            end();
            onFulfilled(value);
          }
        },
        (error: any) => {
          if (running) {
            end();
            onRejected(error);
          }
        },
      );
  }
}


export function awaitPromiseWithAbortSignal<GValue>(
  promise: Promise<GValue>,
  signal: AbortSignal,
  onFulfilled: IOnFulfilled<GValue>,
  onRejected: IOnRejected,
  onAborted: IOnAborted,
): void {
  return awaitPromiseFactoryWithAbortSignal<GValue>(
    () => promise,
    signal,
    onFulfilled,
    onRejected,
    onAborted,
  );
}

export function wrapPromiseFactoryWithAbortSignal<GValue>(
  promiseFactory: (signal: AbortSignal) => Promise<GValue>,
  signal: AbortSignal,
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: GValue) => void,
    reject: (error: any) => void
  ) => {
    if (signal.aborted) {
      reject(createAbortError());
    } else {
      awaitPromiseWithAbortSignal(
        promiseFactory(signal),
        signal,
        resolve,
        reject,
        () => reject(createAbortError())
      );
    }
  });
}

export function wrapPromiseWithAbortSignal<GValue>(
  promise: Promise<GValue>,
  signal: AbortSignal,
): Promise<GValue> {
  return wrapPromiseFactoryWithAbortSignal<GValue>(
    () => promise,
    signal,
  );
}
