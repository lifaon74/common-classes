import { IListener } from '../event-listener-struct';


export function GetListenersHavingName(
  listeners: Map<any, IListener[]>,
  key: any,
): IListener[] {
  if (listeners.has(key)) {
    return listeners.get(key) as IListener[];
  } else {
    const _listeners: IListener[] = [];
    listeners.set(key, _listeners);
    return _listeners;
  }
}

