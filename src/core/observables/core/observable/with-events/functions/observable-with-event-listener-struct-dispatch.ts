import { TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey } from '@lifaon/traits';
import { IEventListenerStruct } from '../../../../../event-listener/raw/struct/event-listener-struct';
import { TGenericObserverLike } from '../../../observer/built-in/default/observer-types';
import { TObservableKeyValueTupleUnion } from '../../built-in/simple/simple-observable-types';
import { ImplTraitEventListenerDispatchForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-dispatch-implementation';

export function ObservableWithEventListenerStructDispatch<// generics
  GObserver extends TGenericObserverLike,
  GKeyValueTupleUnion extends TObservableKeyValueTupleUnion<GObserver>,
  GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>
  //
  >(
  observable: IEventListenerStruct<TObservableKeyValueTupleUnion<GObserver>>,
  key: GKey,
  value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>,
): void {
  ImplTraitEventListenerDispatchForEventListenerStruct.prototype.dispatch.call(observable, key, value);
  // CallTargetTraitMethodOrDefaultImplementation(
  //   observableStruct,
  //   TraitEventListenerDispatch,
  //   'dispatch',
  //   [key, value],
  //   ImplTraitEventListenerDispatchForEventListenerStruct
  // );
}
