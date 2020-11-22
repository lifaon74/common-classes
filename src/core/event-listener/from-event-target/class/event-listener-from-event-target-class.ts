import { AssembleTraitImplementations, CreatePrivateContext, TGenericKeyValueTupleUnion, } from '@lifaon/traits';
import {
  EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT, IEventListenerFromEventTargetPrivateContext,
  IEventListenerFromEventTargetStruct
} from '../struct/event-listener-from-event-target-struct';
import { ITypedEventTarget } from '../event-target-types';
import { ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-dispatch-implementation';
import { ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct } from '../struct/implementations/event-listener-from-event-target-struct-is-dispatching-implementation';
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

export interface IEventListenerFromEventTargetImplementations<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends
  // implementations
  ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>, GKeyValueTupleUnion>,
  ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>>,
  ImplTraitEventListenerOnForEventListenerFromEventTargetStruct<IEventListenerFromEventTarget<GKeyValueTupleUnion>, GKeyValueTupleUnion>
  //
{
}


export const EventListenerImplementations = [
  ImplTraitEventListenerDispatchForEventListenerFromEventTargetStruct,
  ImplTraitEventListenerIsDispatchingForEventListenerFromEventTargetStruct,
  ImplTraitEventListenerOnForEventListenerFromEventTargetStruct,
];

export interface IEventListenerImplementationsConstructor {
  new<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(): IEventListenerFromEventTargetImplementations<GKeyValueTupleUnion>;
}

export interface IEventListenerFromEventTarget<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>, IEventListenerFromEventTargetImplementations<GKeyValueTupleUnion> {
}

const EventListenerImplementationsConstructor = AssembleTraitImplementations<IEventListenerImplementationsConstructor>(EventListenerImplementations);

export class EventListenerFromEventTarget<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends EventListenerImplementationsConstructor<GKeyValueTupleUnion> implements IEventListenerFromEventTarget<GKeyValueTupleUnion> {

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
