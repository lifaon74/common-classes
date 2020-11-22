import { IsObject } from '@lifaon/traits';


export function IsAbortControllerSupported(): boolean {
  return IsObject(globalThis)
    && ('AbortController' in globalThis);
}
