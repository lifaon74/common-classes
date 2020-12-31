import { IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';
import { IOperatorFunction } from './operators';

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous values
 */
export function distinctOperator<GValue>(): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      let previousValue: GValue;
      return observable.subscribe((value: GValue): void => {
        if (value !== previousValue) {
          previousValue = value;
          observer.emit(value);
        }
      });
    });
  };
}
