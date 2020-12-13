
export type RemoveEventListener = () => void;

export function addEventListener(
  target: EventTarget,
  eventName: string,
  callback: (event: Event) => void,
  options?: boolean | AddEventListenerOptions,
): RemoveEventListener {
  target.addEventListener(eventName, callback, options);
  return () => {
    target.removeEventListener(eventName, callback, options);
  };
}
