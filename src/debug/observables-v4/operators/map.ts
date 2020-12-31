import { IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';
import { IOperatorFunction } from './operators';

export function mapOperator<GIn, GOut>(
  mapFunction: (value: GIn) => GOut,
): IOperatorFunction<GIn, GOut> {
  return (observable: IObservable<GIn>): IObservable<GOut> => {
    return new Observable<GOut>((observer: IObserver<GOut>): IObservableUnsubscribeFunction => {
      return observable.subscribe((value: GIn): void => {
        observer.emit(mapFunction(value));
      });
    });
  };
}
