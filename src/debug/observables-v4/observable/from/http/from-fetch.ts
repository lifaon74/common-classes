import { IObservable } from '../../../core/observable';
import {
  fromPromiseWithAbortSignal, IObservableFromPromiseWithAbortSignalNotifications
} from '../from-promise/from-promise-with-abort-signal';

export type IObservableFromFetchNotifications = IObservableFromPromiseWithAbortSignalNotifications<Response>;

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromFetch(input: string | Request, init?: RequestInit): IObservable<IObservableFromFetchNotifications> {
  return fromPromiseWithAbortSignal(
    (signal: AbortSignal) => {
      return fetch(input, {
        ...init,
        signal,
      });
    },
    init,
  );
}

