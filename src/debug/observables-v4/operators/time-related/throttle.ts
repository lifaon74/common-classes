import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';
import { IOperatorFunction } from '../operators';

/**
 * Emits a value from the source Observable, then ignores subsequent source values for a particular time span, then repeats this process.
 * @param duration - throttle time in milliseconds
 */
export function throttleOperator<GValue>(duration: number): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      let timer: any | null = null;
      return observable.subscribe((value: GValue): void => {
        if (timer === null) {
          observer.emit(value);
          timer = setTimeout(() => {
            timer = null;
          }, duration);
        }
      });
    });
  };
}
