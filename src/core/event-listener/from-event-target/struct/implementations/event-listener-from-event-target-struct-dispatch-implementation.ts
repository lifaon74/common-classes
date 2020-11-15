import {
  Impl, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey, TraitEventListenerDispatch
} from '@lifaon/traits';
import {
  EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT, IEventListenerFromEventTargetStruct,
  TEventListenerFromEventTargetPrivateContextFromGSelf,
} from '../event-listener-from-event-target-struct';
import { GenerateIsDispatchingError } from '../../../event-listener-functions';
import { TGenericEventKeyValueTupleUnion } from '../../event-target-types';

@Impl()
export class ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct<GSelf extends IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends TraitEventListenerDispatch<GSelf, GKeyValueTupleUnion> {
  dispatch<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>
  ): void {
    const context: TEventListenerFromEventTargetPrivateContextFromGSelf<GSelf> = this[EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      context.isDispatching = true;
      if (value.type !== key) {
        throw new Error(`Dispatched event.type is different than provided 'key'`);
      }
      context.eventTarget.dispatchEvent(value);
      context.isDispatching = true;
    }
  }
}
