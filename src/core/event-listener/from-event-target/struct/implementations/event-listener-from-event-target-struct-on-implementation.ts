import {
  Impl, TEventListenerOnUnsubscribe, TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey,
  TraitEventListenerOn
} from '@lifaon/traits';

import {
  EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT, IEventListenerFromEventTargetPrivateContext,
  IEventListenerFromEventTargetStruct
} from '../event-listener-from-event-target-struct';
import { TGenericEventKeyValueTupleUnion } from '../../event-target-types';
import { GenerateIsDispatchingError } from '../../../event-listener-functions';


@Impl()
export class ImplTraitEventListenerOnForEventListenerFromEventTargetStruct<GSelf extends IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends TraitEventListenerOn<GSelf, GKeyValueTupleUnion> {
  on<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    this: GSelf,
    key: GKey,
    callback: (value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>) => void,
    options?: AddEventListenerOptions,
  ): TEventListenerOnUnsubscribe {
    const context: IEventListenerFromEventTargetPrivateContext<GKeyValueTupleUnion> = this[EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      context.eventTarget.addEventListener<GKey>(key, callback, options);
      return (): void => {
        if (context.isDispatching) {
          throw GenerateIsDispatchingError();
        } else {
          context.eventTarget.removeEventListener<GKey>(key, callback, options);
        }
      };
    }
  }
}
