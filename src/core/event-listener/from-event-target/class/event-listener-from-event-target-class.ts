import {
  AssembleTraitImplementations, CreatePrivateContext, TGenericKeyValueTupleUnion, TKeyValueMapToKeyValueTupleUnion,
} from '@lifaon/traits';
import {
  EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT, IEventListenerFromEventTargetPrivateContext,
  IEventListenerFromEventTargetStruct
} from '../struct/event-listener-from-event-target-struct';
import { ITypedEventTarget } from '../event-target-types';
import { ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-dispatch-implementation';
import { ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-is-dispatching-implementation';
import { ImplTraitEventListenerOnceForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-once-implementation';
import { ImplTraitEventListenerOnForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-on-implementation';


/** CONSTRUCTOR **/

export function ConstructEventListenerFromEventTarget<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(
  instance: IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>,
  eventTarget: ITypedEventTarget<GKeyValueTupleUnion>
): void {
  CreatePrivateContext<IEventListenerFromEventTargetPrivateContext<GKeyValueTupleUnion>>(
    EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT,
    instance,
    {
      eventTarget,
      isDispatching: false,
    },
  );
}

/** CLASS **/

export interface IEventListenerFromEventTarget<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>,
  ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>, GKeyValueTupleUnion>,
  ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>>,
  ImplTraitEventListenerOnForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>, GKeyValueTupleUnion>,
  ImplTraitEventListenerOnceForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>, GKeyValueTupleUnion> {
}


export interface IAssembledEventListenerImplementations {
  new<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(): IEventListenerFromEventTarget<GKeyValueTupleUnion>;
}

export const EventListenerImplementationsCollection = [
  ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct,
  ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct,
  ImplTraitEventListenerOnForEventListenerFromEventTargetStruct,
  ImplTraitEventListenerOnceForEventListenerFromEventTargetStruct,
];

const AssembledEventListenerImplementations = AssembleTraitImplementations<IAssembledEventListenerImplementations>(EventListenerImplementationsCollection);

export class EventListenerFromEventTarget<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends AssembledEventListenerImplementations<GKeyValueTupleUnion> implements IEventListenerFromEventTarget<GKeyValueTupleUnion> {

  // static fromEventMap<GEventMap extends ([{ [key: string]: Event }] extends [GEventMap] ? { [key: string]: Event } : never)>(
  //   eventTarget: ITypedEventTarget<TKeyValueMapToKeyValueTupleUnion<GEventMap>>
  // ): EventListenerFromEventTarget<TKeyValueMapToKeyValueTupleUnion<GEventMap>> {
  //   return new EventListenerFromEventTarget<TKeyValueMapToKeyValueTupleUnion<GEventMap>>(eventTarget);
  // }

  readonly [EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT]: IEventListenerFromEventTargetPrivateContext<GKeyValueTupleUnion>;

  constructor(
    eventTarget: ITypedEventTarget<GKeyValueTupleUnion>
  ) {
    super();
    ConstructEventListenerFromEventTarget<GKeyValueTupleUnion>(this, eventTarget);
  }
}
