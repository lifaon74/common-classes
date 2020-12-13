import {
  INotificationsObservablePrivateContext, INotificationsObservableStruct, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
} from '../struct/notifications-observable-struct';
import { ImplTraitAddObserverForNotificationsObservableStruct } from '../struct/implementations/notifications-observable-struct-add-observer-implementation';

import {
  TGenericStringKeyValueTupleUnion, TInferNotificationsObserversFromKeyValueTupleUnion,
  TNotificationsObservableCreateFunction,
} from '../notifications-observable-types';
import {
  AssembleTraitImplementations, CreatePrivateContext, TInferKeyValueTupleUnionGKey,
  TInferKeyValueTupleUnionGValueFromKey,
} from '@lifaon/traits';
import { ImplTraitEventListenerIsDispatchingForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-is-dispatching-implementation';
import { ImplTraitEventListenerOnForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-on-implementation';
import { TObservableKeyValueTupleUnion } from '../../../../core/observable/built-in/simple/simple-observable-types';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext
} from '../../../../../event-listener/raw/struct/event-listener-struct';
import { ConstructEventListener } from '../../../../../event-listener/raw/class/event-listener-class';
import { NotificationsObservableStructEmitAll } from '../struct/functions/notifications-observable-struct-emit-all';
import { ImplTraitRemoveObserverForNotificationsObservableStruct } from '../struct/implementations/notifications-observable-struct-remove-observer-implementation';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../verify-types';


/** CONSTRUCTOR **/

export function ConstructNotificationsObservable<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion>(
  instance: INotificationsObservable<GKeyValueTupleUnion>,
  create: TNotificationsObservableCreateFunction<GKeyValueTupleUnion>,
): void {
  ConstructEventListener<TObservableKeyValueTupleUnion<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>>(instance);

  CreatePrivateContext<INotificationsObservablePrivateContext<GKeyValueTupleUnion>>(
    NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
    instance,
    {
      observersMap: new Map<TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>[]>(),
    },
  );

  if (DOT_NOT_VERIFY_TYPES || (typeof create === 'function')) {
    let isDispatching: boolean = false;
    create(<GName extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(name: GName, value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GName>): void => {
      if (isDispatching) {
        throw new Error(`Operation is not permitted: the observable is currently dispatching a value`);
      } else {
        isDispatching = true;
        NotificationsObservableStructEmitAll<GKeyValueTupleUnion, GName>(instance, name, value);
        isDispatching = false;
      }
    }, instance);
  } else {
    throw new TypeError(`Expected function for argument 'create'.`);
  }
}

/** CLASS **/

export interface INotificationsObservableImplementations<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> extends
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<INotificationsObservable<GKeyValueTupleUnion>>,
  ImplTraitEventListenerOnForEventListenerStruct<INotificationsObservable<GKeyValueTupleUnion>, TObservableKeyValueTupleUnion<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>>,

  // own implementations
  ImplTraitAddObserverForNotificationsObservableStruct<INotificationsObservable<GKeyValueTupleUnion>, GKeyValueTupleUnion>,
  ImplTraitRemoveObserverForNotificationsObservableStruct<INotificationsObservable<GKeyValueTupleUnion>, GKeyValueTupleUnion>
  //
{
}

export interface INotificationsObservableImplementationsConstructor {
  new<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion>(): INotificationsObservableImplementations<GKeyValueTupleUnion>;
}

export const NotificationsObservableImplementations = [
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,

  // own implementations
  ImplTraitAddObserverForNotificationsObservableStruct,
  ImplTraitRemoveObserverForNotificationsObservableStruct,
];

export interface INotificationsObservable<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> extends INotificationsObservableStruct<GKeyValueTupleUnion>, INotificationsObservableImplementations<GKeyValueTupleUnion> {
}

const NotificationsObservableImplementationsConstructor = AssembleTraitImplementations<INotificationsObservableImplementationsConstructor>(NotificationsObservableImplementations);

export class NotificationsObservable<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> extends NotificationsObservableImplementationsConstructor<GKeyValueTupleUnion> implements INotificationsObservable<GKeyValueTupleUnion> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<TObservableKeyValueTupleUnion<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>>;
  readonly [NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT]: INotificationsObservablePrivateContext<GKeyValueTupleUnion>;

  constructor(
    create: TNotificationsObservableCreateFunction<GKeyValueTupleUnion>,
  ) {
    super();
    ConstructNotificationsObservable<GKeyValueTupleUnion>(this, create);
  }
}
