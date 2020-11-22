import { TGenericObserverLike } from '../../../observer/observer-types';
import { IObservableStruct } from '../observable-struct';
import { ImplTraitEventListenerDispatchForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-dispatch-implementation';
import { TObservableKeyValueTupleUnion } from '../../observable-types';
import { TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey } from '@lifaon/traits';

export function ObservableStructDispatch<GObserver extends TGenericObserverLike,
  GKeyValueTupleUnion extends TObservableKeyValueTupleUnion<GObserver>,
  GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
  observableStruct: IObservableStruct<GObserver>,
  key: GKey,
  value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
): void {
  ImplTraitEventListenerDispatchForEventListenerStruct.prototype.dispatch.call(observableStruct, key, value);
  // CallTargetTraitMethodOrDefaultImplementation(
  //   observableStruct,
  //   TraitEventListenerDispatch,
  //   'dispatch',
  //   [key, value],
  //   ImplTraitEventListenerDispatchForEventListenerStruct
  // );
}
