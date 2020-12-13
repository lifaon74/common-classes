import {
  INotificationsObserverPrivateContext, INotificationsObserverStruct, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
} from '../struct/notifications-observer-struct';
import { ImplTraitGetNameForNotificationsObserverStruct } from '../struct/implementations/notifications-observer-struct-get-name-implementation';
import { TNotificationsObserverCallback } from '../notifications-observer-types';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitEmitForNotificationsObserverStruct } from '../struct/implementations/notifications-observer-struct-emit-implementation';
import { ImplTraitEmitValueForNotificationsObserverStruct } from '../struct/implementations/notifications-observer-struct-emit-value-implementation';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../verify-types';

/** CONSTRUCTOR **/

export function ConstructNotificationsObserver<GName extends string, GValue>(
  instance: INotificationsObserverStruct<GName, GValue>,
  name: GName,
  emitValue: TNotificationsObserverCallback<GValue>,
): void {
  if (!DOT_NOT_VERIFY_TYPES && (typeof name !== 'string')) {
    throw new TypeError(`Expected string for argument 'name'.`);
  }

  if (!DOT_NOT_VERIFY_TYPES && (typeof emitValue !== 'function')) {
    throw new TypeError(`Expected function for argument 'emitValue'.`);
  }

  CreatePrivateContext<INotificationsObserverPrivateContext<GName, GValue>>(
    NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
    instance,
    {
      name,
      emitValue,
    },
  );
}

/** CLASS **/

export interface INotificationsObserverImplementations<GName extends string, GValue> extends
  // own implementations coming from observer
  ImplTraitEmitForNotificationsObserverStruct<INotificationsObserver<GName, GValue>, GName, GValue>,
  // own implementations
  ImplTraitGetNameForNotificationsObserverStruct<INotificationsObserver<GName, GValue>, GName>,
  ImplTraitEmitValueForNotificationsObserverStruct<INotificationsObserver<GName, GValue>, GValue>
  //
{
}

export const NotificationsObserverImplementations = [
  // own implementations coming from observer
  ImplTraitEmitForNotificationsObserverStruct,
  // own implementations
  ImplTraitGetNameForNotificationsObserverStruct,
  ImplTraitEmitValueForNotificationsObserverStruct,
];

export interface INotificationsObserverImplementationsConstructor {
  new<GName extends string, GValue>(): INotificationsObserverImplementations<GName, GValue>;
}

export interface INotificationsObserver<GName extends string, GValue> extends INotificationsObserverStruct<GName, GValue>, INotificationsObserverImplementations<GName, GValue> {
}

const NotificationsObserverImplementationsConstructor = AssembleTraitImplementations<INotificationsObserverImplementationsConstructor>(NotificationsObserverImplementations);

export class NotificationsObserver<GName extends string, GValue> extends NotificationsObserverImplementationsConstructor<GName, GValue> implements INotificationsObserver<GName, GValue> {
  readonly [NOTIFICATION_OBSERVER_PRIVATE_CONTEXT]: INotificationsObserverPrivateContext<GName, GValue>;

  constructor(
    name: GName,
    emitValue: TNotificationsObserverCallback<GValue>,
  ) {
    super();
    ConstructNotificationsObserver<GName, GValue>(this, name, emitValue);
  }
}
