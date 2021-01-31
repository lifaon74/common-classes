import { ITypedPureEventTarget } from '../../../../misc/event-listener/typed-event-target.type';
import type { TKeyValueTuple } from '@lifaon/traits';
import { createEventListener } from '../../../../misc/event-listener/create-event-listener';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

/**
 * Creates a SubscribeFunction which emits events dispatched by 'target'
 */
export function fromEventTarget<GName extends string, GEvent extends Event>(
  target: ITypedPureEventTarget<TKeyValueTuple<GName, GEvent>>,
  eventName: GName,
  options?: AddEventListenerOptions,
): ISubscribeFunction<GEvent> {
  return (emit: IEmitFunction<GEvent>): IUnsubscribeFunction => {
    return createEventListener<GName, GEvent>(target, eventName, emit, options);
  };
}


