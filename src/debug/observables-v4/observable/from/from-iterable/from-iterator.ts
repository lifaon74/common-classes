import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

export function fromIterator<GValue>(iterator: Iterator<GValue>): IObservable<GValue> {
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    let result: IteratorResult<GValue>;
    while (running && !(result = iterator.next()).done) {
      observer.emit(result.value);
    }
    return (): void => {
      running = false;
    };
  });
}
