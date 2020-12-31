import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

/**
 * Creates an Observable that emits when idle time is available.
 */
export function idle(): IObservable<void> {
  return new Observable<void>((observer: IObserver<void>): IObservableUnsubscribeFunction => {
    let timer: any;
    const loop = () => {
      timer = requestIdleCallback(() => {
        observer.emit();
        loop();
      });
    };
    return (): void => {
      cancelIdleCallback(timer);
    };
  });
}
