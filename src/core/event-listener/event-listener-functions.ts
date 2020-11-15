
export function GenerateIsDispatchingError() {
  return new Error(`Operation is not permitted: the event listener is currently dispatching an event`);
}

