export function IsAbortController(value: any): value is AbortController {
  return value instanceof AbortController;
}

