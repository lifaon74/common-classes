import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';
import { IOperatorFunction } from '../operators';

/**
 * Emits a value from the source Observable, then, for a duration determined by 'duration', if a value is received, cache it and emits it at the end of the timer.
 * As result, a value if emitted evey 'duration' ms at the best, and the last emitted value if always transmitted.
 * @param duration - time interval between values in milliseconds
 */
export function periodOperator<GValue>(duration: number): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      let timer: any | null = null;
      let previousValue: GValue;
      let hasValue: boolean = false;

      const emit = (value: GValue): void => {
        if (timer === null) {
          observer.emit(value);
          hasValue = false;
          timer = setTimeout(() => {
            timer = null;
            if (hasValue) {
              emit(previousValue);
            }
          }, duration);
        } else {
          hasValue = true;
          previousValue = value;
        }
      };

      return observable.subscribe(emit);
    });
  };
}

