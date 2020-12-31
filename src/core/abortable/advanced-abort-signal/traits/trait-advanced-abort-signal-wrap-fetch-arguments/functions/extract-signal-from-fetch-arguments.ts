import { isAbortSignal } from '../../../../../../debug/observables-v5/misc/abortable/is-abort-signal';
import { isAbortControllerSupported } from '../../../../../../debug/observables-v5/misc/abortable/is-abort-controller-supported';


/**
 * Returns the linked AbortSignal (if exists) of a fetch request
 */
export function ExtractSignalFromFetchArguments(requestInfo: RequestInfo, requestInit: RequestInit = {}): AbortSignal | null {
  if (isAbortControllerSupported()) {
    if (isAbortSignal(requestInit.signal)) {
      return requestInit.signal;
    } else if (
      (requestInfo instanceof Request)
      && isAbortSignal(requestInfo.signal)
    ) {
      return requestInfo.signal;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

