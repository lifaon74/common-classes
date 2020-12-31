import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

export function domResize(
  element: Element,
  options?: ResizeObserverOptions,
): IObservable<void> {
  return new Observable<void>((observer: IObserver<void>): IObservableUnsubscribeFunction => {
    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      observer.emit();
    });
    resizeObserver.observe(element, options);
    return (): void => {
      resizeObserver.disconnect();
    };
  });
}

