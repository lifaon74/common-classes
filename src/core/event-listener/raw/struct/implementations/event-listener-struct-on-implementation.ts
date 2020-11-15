import {
  Impl, TEventListenerOnUnsubscribe, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey, TraitEventListenerOn
} from '@lifaon/traits';

import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext, IEventListenerStruct, IListener
} from '../event-listener-struct';

import { GetListenersHavingName } from '../functions/event-listener-struct-functions';
import { GenerateIsDispatchingError } from '../../../event-listener-functions';

@Impl()
export class ImplTraitEventListenerOnForEventListenerStruct<GSelf extends IEventListenerStruct<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOn<GSelf, GKeyValueTupleUnion> {
  on<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void
  ): TEventListenerOnUnsubscribe {
    const context: IEventListenerPrivateContext<GKeyValueTupleUnion> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      const listeners: IListener[] = GetListenersHavingName(context.listeners, key);

      const listener: IListener = { callback };

      listeners.push(listener);

      return (): void => {
        if (context.isDispatching) {
          throw GenerateIsDispatchingError();
        } else {
          const length: number = listeners.length;
          for (let i: number = 0; i < length; i++) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
          }
          if (listeners.length === 0) {
            context.listeners.delete(key);
          }
        }
      };
    }
  }
}
