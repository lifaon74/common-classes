import {
  INotificationPrivateContext, INotificationStruct, NOTIFICATION_PRIVATE_CONTEXT,
} from '../struct/notification-struct';
import { ImplTraitGetNameForNotificationStruct } from '../struct/implementations/notification-struct-get-name-implementation';
import { ImplTraitGetValueForNotificationStruct } from '../struct/implementations/notification-struct-get-value-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { TGenericEventLike } from '../../event-listener/event-listener-types';

/** CONSTRUCTOR **/

export function ConstructNotification<GName extends string, GValue>(
  instance: INotificationStruct<GName, GValue>,
  name: GName,
  value: GValue,
): void {
  if (typeof name !== 'string') {
    throw new TypeError(`Expected string for argument 'name'.`);
  }

  CreatePrivateContext<INotificationPrivateContext<GName, GValue>>(
    NOTIFICATION_PRIVATE_CONTEXT,
    instance,
    {
      name,
      value,
    },
  );
}

/** CLASS **/

export interface INotificationImplementations<GName extends string, GValue> extends
  // implementations
  ImplTraitGetNameForNotificationStruct<INotification<GName, GValue>>,
  ImplTraitGetValueForNotificationStruct<INotification<GName, GValue>> {
}

export const NotificationImplementations = [
  ImplTraitGetNameForNotificationStruct,
  ImplTraitGetValueForNotificationStruct,
];

export interface INotificationImplementationsConstructor {
  new<GName extends string, GValue>(): INotificationImplementations<GName, GValue>;
}

export interface INotification<GName extends string, GValue> extends INotificationStruct<GName, GValue>, INotificationImplementations<GName, GValue> {
}

const NotificationImplementationsConstructor = AssembleTraitImplementations<INotificationImplementationsConstructor>(NotificationImplementations);


export class Notification<GName extends string, GValue> extends NotificationImplementationsConstructor<GName, GValue> implements INotification<GName, GValue> {

  static fromEvent<GName extends string, GEvent extends TGenericEventLike>(event: GEvent): INotification<GName, GEvent> {
    return new Notification<GName, GEvent>(event.type as GName, event);
  }

  readonly [NOTIFICATION_PRIVATE_CONTEXT]: INotificationPrivateContext<GName, GValue>;

  constructor(
    name: GName,
    value: GValue,
  ) {
    super();
    ConstructNotification<GName, GValue>(this, name, value);
  }
}
