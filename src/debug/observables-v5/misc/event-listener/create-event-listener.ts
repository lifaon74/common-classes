import { ITypedPureEventTarget } from './typed-event-target';
import { TKeyValueTuple } from '@lifaon/traits';

export interface IRemoveEventListener {
  (): void;
}

export function createEventListener<GName extends string, GEvent extends Event>(
  target: ITypedPureEventTarget<TKeyValueTuple<GName, GEvent>>,
  eventName: GName,
  callback: (event: GEvent) => void,
  options?: boolean | AddEventListenerOptions,
): IRemoveEventListener {
  target.addEventListener(eventName, callback, options);
  return () => {
    target.removeEventListener(eventName, callback, options);
  };
}

// export function addEventListener(
//   target: EventTarget,
//   eventName: string,
//   callback: (event: Event) => void,
//   options?: boolean | AddEventListenerOptions,
// ): RemoveEventListener {
//   target.addEventListener(eventName, callback, options);
//   return () => {
//     target.removeEventListener(eventName, callback, options);
//   };
// }