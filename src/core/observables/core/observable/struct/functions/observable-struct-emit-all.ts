import { TGenericObserverLike, TInferObserverLikeGValue } from '../../../observer/observer-types';
import { IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT } from '../observable-struct';

export function ObservableStructEmitAll<GObserver extends TGenericObserverLike>(
  observableStruct: IObservableStruct<GObserver>,
  value: TInferObserverLikeGValue<GObserver>,
): void {
  const observers: GObserver[] = observableStruct[OBSERVABLE_PRIVATE_CONTEXT].observers;
  for (let i = 0, l = observers.length; i < l; i++) {
    observers[i].emit(value);
  }
}
