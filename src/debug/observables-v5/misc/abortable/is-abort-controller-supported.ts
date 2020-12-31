import { IsObject } from '@lifaon/traits';


export function isAbortControllerSupported(): boolean {
  return IsObject(globalThis)
    && ('AbortController' in globalThis);
}
