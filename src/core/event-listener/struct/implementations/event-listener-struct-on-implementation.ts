import {
  Impl, TEventListenerOnUnsubscribe, TEventMap, TInferEventMapKeys, TListenerCallback, TraitEventListenerOn
} from '@lifaon/traits';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext, IListener, TGenericEventListenerStruct,
  TInferEventListenerStructGEventMap
} from '../event-listener-struct';
import { GenerateIsDispatchingError, GetListenersHavingName } from '../functions/event-listener-struct-functions';

@Impl()
export class ImplTraitEventListenerOnForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerOn<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  on<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
    this: GSelf,
    eventName: GEventName,
    callback: TListenerCallback<TInferEventListenerStructGEventMap<GSelf>, GEventName>,
  ): TEventListenerOnUnsubscribe {
    // type GEventMap = TInferEventListenerStructGEventMap<GSelf>;
    type GEventMap = TEventMap;
    const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      const listeners: IListener[] = GetListenersHavingName(context.listeners, eventName);

      const listener: IListener = { callback };

      listeners.push(listener);

      return (): void => {
        if (context.isDispatching) {
          throw GenerateIsDispatchingError();
        } else {
          for (let i = 0, l = listeners.length; i < l; i++) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
            }
          }
        }
      };
    }
  }
}
