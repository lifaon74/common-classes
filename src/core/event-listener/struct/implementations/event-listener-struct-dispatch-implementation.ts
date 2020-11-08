import { Impl, TEventMap, TInferEventMapKeys, TraitEventListenerDispatch } from '@lifaon/traits';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext, IListener, TGenericEventListenerStruct,
  TInferEventListenerStructGEventMap
} from '../event-listener-struct';
import { GenerateIsDispatchingError } from '../functions/event-listener-struct-functions';

@Impl()
export class ImplTraitEventListenerDispatchForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerDispatch<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  dispatch<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
    this: GSelf,
    eventName: GEventName,
    value: TInferEventListenerStructGEventMap<GSelf>[GEventName],
  ): void {
    // type GEventMap = TInferEventListenerStructGEventMap<GSelf>;
    type GEventMap = TEventMap;
    const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      if (context.listeners.has(eventName)) {
        context.isDispatching = true;
        const listeners: IListener[] = (context.listeners.get(eventName) as IListener[]);
        for (let i = 0, l = listeners.length; i < l; i++) {
          listeners[i].callback(value);
        }
        context.isDispatching = false;
      }
    }

  }
}
