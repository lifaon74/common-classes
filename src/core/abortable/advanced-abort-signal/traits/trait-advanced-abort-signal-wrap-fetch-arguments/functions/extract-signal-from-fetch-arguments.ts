import { IsObject } from '@lifaon/traits';
import { IsAbortSignal } from '../../../../functions/is-abort-signal';


/**
 * Returns the linked AbortSignal (if exists) of a fetch request
 */
export function ExtractSignalFromFetchArguments(requestInfo: RequestInfo, requestInit: RequestInit = {}): AbortSignal | null {
  if (IsObject(globalThis) && ('AbortController' in globalThis)) {
    if (IsAbortSignal(requestInit.signal)) {
      return requestInit.signal;
    } else if (
      (requestInfo instanceof Request)
      && IsAbortSignal(requestInfo.signal)
    ) {
      return requestInfo.signal;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

