import { Impl, TraitEventListenerIsDispatching } from '@lifaon/traits';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, TGenericEventListenerStruct, TInferEventListenerStructGEventMap
} from '../event-listener-struct';

@Impl()
export class ImplTraitEventListenerIsDispatchingForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerIsDispatching<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  isDispatching(this: GSelf): boolean {
    return this[EVENT_LISTENER_PRIVATE_CONTEXT].isDispatching;
  }
}
