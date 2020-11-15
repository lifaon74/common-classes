import { Impl, TraitEventListenerIsDispatching } from '@lifaon/traits';
import {
  EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT, TGenericEventListenerFromEventTargetStruct
} from '../event-listener-from-event-target-struct';

@Impl()
export class ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct<GSelf extends TGenericEventListenerFromEventTargetStruct> extends TraitEventListenerIsDispatching<GSelf> {
  isDispatching(this: GSelf): boolean {
    return this[EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT].isDispatching;
  }
}
