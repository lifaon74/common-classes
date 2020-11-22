import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext, IEventListenerStruct, IListener,
} from '../struct/event-listener-struct';
import { ImplTraitEventListenerOnForEventListenerStruct } from '../struct/implementations/event-listener-struct-on-implementation';
import { ImplTraitEventListenerIsDispatchingForEventListenerStruct } from '../struct/implementations/event-listener-struct-is-dispatching-implementation';
import {
  AssembleTraitImplementations, CreatePrivateContext, TGenericKeyValueTupleUnion, TInferKeyValueTupleUnionGKey,
} from '@lifaon/traits';
import { ImplTraitEventListenerDispatchForEventListenerStruct } from '../struct/implementations/event-listener-struct-dispatch-implementation';


/** CONSTRUCTOR **/

export function ConstructEventListener<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(
  instance: IEventListenerStruct<GKeyValueTupleUnion>,
): void {
  CreatePrivateContext<IEventListenerPrivateContext<GKeyValueTupleUnion>>(
    EVENT_LISTENER_PRIVATE_CONTEXT,
    instance,
    {
      listeners: new Map<Extract<TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>, string>, IListener[]>(),
      isDispatching: false,
    },
  );
}

/** CLASS **/

export interface IEventListenerImplementations<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends
  // implementations
  ImplTraitEventListenerDispatchForEventListenerStruct<IEventListener<GKeyValueTupleUnion>, GKeyValueTupleUnion>,
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<IEventListener<GKeyValueTupleUnion>>,
  ImplTraitEventListenerOnForEventListenerStruct<IEventListener<GKeyValueTupleUnion>, GKeyValueTupleUnion>
  //
{
}

export const EventListenerImplementations = [
  ImplTraitEventListenerDispatchForEventListenerStruct,
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,
];

export interface IEventListenerImplementationsConstructor {
  new<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(): IEventListenerImplementations<GKeyValueTupleUnion>;
}


export interface IEventListener<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends IEventListenerStruct<GKeyValueTupleUnion>, IEventListenerImplementations<GKeyValueTupleUnion> {
}

const EventListenerImplementationsConstructor = AssembleTraitImplementations<IEventListenerImplementationsConstructor>(EventListenerImplementations);

export class EventListener<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends EventListenerImplementationsConstructor<GKeyValueTupleUnion> implements IEventListener<GKeyValueTupleUnion> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<GKeyValueTupleUnion>;

  constructor() {
    super();
    ConstructEventListener<GKeyValueTupleUnion>(this);
  }
}
