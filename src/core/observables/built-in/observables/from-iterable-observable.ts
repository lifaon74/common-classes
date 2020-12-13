import { IObservable, Observable } from '../../core/observable/with-events/class/observable-class';
import { IObserverLike } from '../../core/observer/built-in/default/observer-types';
import { TInferObservableEmitFunctionFromObserver } from '../../core/observable/built-in/simple/simple-observable-types';

export class FromIterableObservable<GValue> extends Observable<IObserverLike<GValue>> {
  constructor(iterable: Iterable<GValue>) {
    const array = Array.isArray(iterable)
      ? iterable
      : Array.from(iterable);
    super((emit: TInferObservableEmitFunctionFromObserver<IObserverLike<GValue>>, observable: IObservable<IObserverLike<GValue>>) => {
      observable.on('add-observer', () => {
        for (let i = 0, l = array.length; i < l; i++) {
          emit(array[i]);
        }
      });
    });
  }
}

