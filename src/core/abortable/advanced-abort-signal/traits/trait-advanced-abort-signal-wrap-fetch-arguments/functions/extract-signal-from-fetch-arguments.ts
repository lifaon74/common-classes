import { IsAbortSignal } from '../../../../../helpers/abortable/is-abort-signal';
import { IsAbortControllerSupported } from '../../../../../helpers/abortable/is-abort-controller-supported';


/**
 * Returns the linked AbortSignal (if exists) of a fetch request
 */
export function ExtractSignalFromFetchArguments(requestInfo: RequestInfo, requestInit: RequestInit = {}): AbortSignal | null {
  if (IsAbortControllerSupported()) {
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

