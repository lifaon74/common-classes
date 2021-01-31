import { isObject } from '../helpers/is-object';


export function isAbortControllerSupported(): boolean {
  return isObject(globalThis)
    && ('AbortController' in globalThis);
}
