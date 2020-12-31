import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';
import { IOperatorFunction } from '../operators';

/**
 * Emits a value from the source Observable only after a particular time span has passed without another source emission.
 * @param duration - debounce time in milliseconds
 */
export function debounceOperator<GValue>(duration: number): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      let timer: any | null = null;
      return observable.subscribe((value: GValue): void => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          observer.emit(value);
        }, duration);
      });
    });
  };
}
