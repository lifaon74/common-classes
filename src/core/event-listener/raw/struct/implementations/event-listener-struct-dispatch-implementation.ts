import {
  Impl, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
  TraitEventListenerDispatch
} from '@lifaon/traits';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext, IEventListenerStruct, IListener,
} from '../event-listener-struct';
import { GenerateIsDispatchingError } from '../../../event-listener-functions';

@Impl()
export class ImplTraitEventListenerDispatchForEventListenerStruct<GSelf extends IEventListenerStruct<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerDispatch<GSelf, GKeyValueTupleUnion> {
  dispatch<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>
  ): void {
    const context: IEventListenerPrivateContext<GKeyValueTupleUnion> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      if (context.listeners.has(key)) {
        context.isDispatching = true;
        const listeners: IListener[] = (context.listeners.get(key) as IListener[]);
        for (let i = 0, l = listeners.length; i < l; i++) {
          listeners[i].callback(value);
        }
        context.isDispatching = false;
      }
    }
  }
}
