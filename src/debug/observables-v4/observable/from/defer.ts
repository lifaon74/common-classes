import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';


export interface IDefferFactoryFunction<GValue> {
  (): IObservable<GValue>;
}

/**
 * Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
 */
export function defer<GValue>(
  observableFactory: IDefferFactoryFunction<GValue>,
): IObservable<GValue> {
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    return observableFactory().subscribe(observer);
  });
}


