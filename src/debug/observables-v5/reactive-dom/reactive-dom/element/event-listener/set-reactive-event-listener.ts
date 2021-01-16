import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { fromEventTarget } from '../../../../subscribe-function/from/dom/from-event-target/from-event-target';
import { ITypedPureEventTarget } from '../../../../misc/event-listener/typed-event-target';
import { TKeyValueTuple } from '@lifaon/traits';
import { IEmitFunction } from '../../../../types/emit-function/emit-function';

export function setReactiveEventListener<GName extends string, GEvent extends Event>(
  emit: IEmitFunction<any>,
  target: Node & ITypedPureEventTarget<TKeyValueTuple<GName, GEvent>>,
  eventName: GName,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GName, GEvent>(target, eventName), emit);
}


