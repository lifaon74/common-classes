import { TGenericObserverLike, TInferObserverLikeGValue } from '../../../../../observer/built-in/default/observer-types';
import { ISimpleObservableStruct, SIMPLE_OBSERVABLE_PRIVATE_CONTEXT } from '../simple-observable-struct';

export function SimpleObservableStructEmitAll<GObserver extends TGenericObserverLike>(
  observableStruct: ISimpleObservableStruct<GObserver>,
  value: TInferObserverLikeGValue<GObserver>,
): void {
  const observers: GObserver[] = observableStruct[SIMPLE_OBSERVABLE_PRIVATE_CONTEXT].observers;
  for (let i = 0, l = observers.length; i < l; i++) {
    observers[i].emit(value);
  }
}
