import { IGenericObservable, IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';
import { addEventListener, RemoveEventListener } from '../../../core/helpers/event-listener/add-event-listener';
import { IsAbortSignal } from '../../../core/helpers/abortable/is-abort-signal';
import { dispatch } from '../observer/dispatch';
import { noop } from '../misc/helpers/noop';
import { TupleTypes } from '@lifaon/traits';
import { IErrorNotification } from '../notifications/build-in/error-notification';
import { ICompleteNotification } from '../notifications/build-in/complete-notification';
import { INextNotification } from '../notifications/build-in/next-notification';
import { IAbortNotification } from '../notifications/build-in/abort-notification';


// TODO create fromArrayNotifications
export function fromArray<GValue>(array: ArrayLike<GValue>): IObservable<GValue> {
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      observer.emit(array[i]);
    }
    return (): void => {
      running = false;
    };
  });
}

export function fromIterator<GValue>(iterator: Iterator<GValue>): IObservable<GValue> {
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      observer.emit(result.value);
    }
    return (): void => {
      running = false;
    };
  });
}


export type IObservableFromIteratorNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  ;

export function fromIteratorWithNotifications<GValue>(iterator: Iterator<GValue>): IObservable<IObservableFromIteratorNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromIteratorNotifications<GValue>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      dispatch(observer, 'next', result.value);
    }
    if (running) {
      dispatch(observer, 'complete', void 0);
    }
    return () => {
      running = false;
    };
  });
}


export function fromIterable<GValue>(iterable: Iterable<GValue>): IObservable<GValue> {
  return fromIterator<GValue>(iterable[Symbol.iterator]());
}

export function fromEventTarget<GEvent extends Event>(target: EventTarget, eventName: string, options?: AddEventListenerOptions): IObservable<GEvent> {
  return new Observable<GEvent>((observer: IObserver<GEvent>): IObservableUnsubscribeFunction => {

    const eventHandler = (event: Event) => {
      observer.emit(event as GEvent);
    };

    target.addEventListener(eventName, eventHandler, options);

    return (): void => {
      target.removeEventListener(eventName, eventHandler, options);
    };
  });
}


export type IObservableFromFetchNotifications =
  INextNotification<Response>
  | ICompleteNotification
  | IErrorNotification
  | IAbortNotification<void>
  ;

export function fromFetch(input: string | Request, init?: RequestInit): IObservable<IObservableFromFetchNotifications> {
  return new Observable<IObservableFromFetchNotifications>((observer: IObserver<IObservableFromFetchNotifications>): IObservableUnsubscribeFunction => {

    let controller: AbortController;
    let removeAbortEventListener: RemoveEventListener;

    if ((init !== void 0) && IsAbortSignal(init.signal)) {
      if (init.signal.aborted) {
        dispatch(observer, 'abort', void 0);
        return noop;
      } else {
        controller = new AbortController();
        removeAbortEventListener = addEventListener(init.signal, 'abort', () => {
          controller.abort();
          dispatch(observer, 'abort', void 0);
        });
      }
    } else {
      controller = new AbortController();
    }

    const signal: AbortSignal = controller.signal;
    let running: boolean = true;

    fetch(input, {
      ...init,
      signal,
    })
      .then(
        (response: Response) => {
          dispatch(observer, 'next', response);
          if (running) {
            dispatch(observer, 'complete', void 0);
          }
        },
        (error: any) => {
          if (!signal.aborted) {
            dispatch(observer, 'error', error);
          }
        }
      );

    return (): void => {
      running = false;
      if (removeAbortEventListener !== void 0) {
        removeAbortEventListener();
      }
      controller.abort();
    };
  });
}


export type IObservableFromPromiseNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

export function fromPromise<GValue>(promise: Promise<GValue>): IObservable<IObservableFromPromiseNotifications<GValue>> {
  return new Observable<IObservableFromPromiseNotifications<GValue>>((observer: IObserver<IObservableFromPromiseNotifications<GValue>>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            dispatch(observer, 'next', value);
          }
          if (running) {
            dispatch(observer, 'complete', void 0);
          }
        },
        (error: any) => {
          if (running) {
            dispatch(observer, 'error', error);
          }
        }
      );

    return (): void => {
      running = false;
    };
  });
}


export function throwError<GError>(error: GError): IObservable<IErrorNotification<GError>> {
  return new Observable<IErrorNotification<GError>>((observer: IObserver<IErrorNotification<GError>>): IObservableUnsubscribeFunction => {
    dispatch(observer, 'error', error);
    return noop;
  });
}


export type TMergeObservablesValues<GObservables extends IGenericObservable[]> = TupleTypes<{
  [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<infer GValue>
    ? GValue
    : never;
}>;

export function merge<GObservables extends IGenericObservable[]>(
  ...observables: GObservables
): IObservable<TMergeObservablesValues<GObservables>> {
  type GValue = TMergeObservablesValues<GObservables>;
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    const unsubscribe: IObservableUnsubscribeFunction[] = observables
      .map((observable: IGenericObservable) => {
        return observable.subscribe((value: GValue) => {
          observer.emit(value);
        });
      });
    return (): void => {
      for (let i = 0, l = unsubscribe.length; i < l; i++) {
        unsubscribe[i]();
      }
    };
  });
}


