import { IListener } from '../event-listener-struct';


export function GetListenersHavingName(
  listeners: Map<string, IListener[]>,
  eventName: string,
) {
  if (listeners.has(eventName)) {
    return listeners.get(eventName) as IListener[];
  } else {
    const _listeners: IListener[] = [];
    listeners.set(eventName, _listeners);
    return _listeners;
  }
}

export function GenerateIsDispatchingError() {
  return new Error(`Operation is not permitted: the event listener is currently dispatching an event`);
}
