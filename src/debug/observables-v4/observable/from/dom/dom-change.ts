import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

export const DOM_CHANGE_DEFAULT_OPTIONS: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
};

export function domChange(
  node: Node = document,
  options: MutationObserverInit = DOM_CHANGE_DEFAULT_OPTIONS,
): IObservable<void> {
  return new Observable<void>((observer: IObserver<void>): IObservableUnsubscribeFunction => {
    const mutationObserver: MutationObserver = new MutationObserver(() => {
      observer.emit();
    });
    mutationObserver.observe(node, options);
    return (): void => {
      mutationObserver.disconnect();
    };
  });
}

