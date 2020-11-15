export function IsAbortSignal(value: any): value is AbortSignal {
  return value instanceof AbortSignal;
}

