import { IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';

export function interval(ms: number): IObservable<void> {
  return new Observable<void>((observer: IObserver<void>): IObservableUnsubscribeFunction => {
    const timer: any = setInterval(() => observer.emit(), ms);
    return (): void => {
      clearInterval(timer);
    };
  });
}
