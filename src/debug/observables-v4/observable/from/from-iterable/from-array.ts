import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';

export function fromArray<GValue>(array: ArrayLike<GValue>): IObservable<GValue> {
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      observer.emit(array[i]);
    }
    return (): void => {
      running = false;
    };
  });
}
