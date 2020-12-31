import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';


export interface IExpressionFunction<GValue> {
  (): GValue;
}

/**
 * Creates an Observable that runs 'callback' when idle time is available, and emit distinct returned values.
 */
export function expression<GValue>(
  callback: IExpressionFunction<GValue>,
  previousValue?: GValue,
): IObservable<GValue> {
  // return idle()
  //   .pipe(
  //     mapOperator<void, GValue>(callback),
  //     distinctOperator<GValue>(previousValue),
  //   );
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    let timer: any;
    const loop = () => {
      timer = requestIdleCallback(() => {
        const value: GValue = callback();
        if (value !== previousValue) {
          previousValue = value;
          observer.emit(value);
        }
        loop();
      });
    };
    return (): void => {
      cancelIdleCallback(timer);
    };
  });
}


