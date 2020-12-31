import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';
import { IOperatorFunction } from '../operators';

/**
 * Delays the emission of values from the source Observable by a given duration.
 * @param duration - delay time of each value in milliseconds
 * INFO: inaccurate because values may be transmitted in a different order
 */
export function delayOperator<GValue>(duration: number): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      const timers: Set<any> = new Set<any>();
      const unsubscribe: IObservableUnsubscribeFunction = observable.subscribe((value: GValue): void => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          observer.emit(value);
        }, duration);
        timers.add(timer);
      });

      return (): void => {
        unsubscribe();
        timers.forEach((timer: any) => {
          clearTimeout(timer);
        });
      };
    });
  };
}
