import {
  INotificationPrivateContext, INotificationStruct, NOTIFICATION_PRIVATE_CONTEXT,
} from '../struct/notification-struct';
import { ImplTraitGetNameForNotificationStruct } from '../struct/implementations/notification-struct-get-name-implementation';
import { ImplTraitGetValueForNotificationStruct } from '../struct/implementations/notification-struct-get-value-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

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

export interface INotification<GName extends string, GValue> extends INotificationStruct<GName, GValue>,
  ImplTraitGetNameForNotificationStruct<INotification<GName, GValue>>,
  ImplTraitGetValueForNotificationStruct<INotification<GName, GValue>> {
}

export interface IAssembledNotificationImplementations {
  new<GName extends string, GValue>(): INotification<GName, GValue>;
}

export const NotificationImplementationsCollection = [
  ImplTraitGetNameForNotificationStruct,
  ImplTraitGetValueForNotificationStruct,
];

const AssembledNotificationImplementations = AssembleTraitImplementations<IAssembledNotificationImplementations>(NotificationImplementationsCollection);

// TODO temporally only !!!!
export interface IEventLike extends Event {
}

export class Notification<GName extends string, GValue> extends AssembledNotificationImplementations<GName, GValue> implements INotification<GName, GValue> {

  static fromEvent<GName extends string, GEvent extends IEventLike>(event: GEvent): INotification<GName, GEvent> {
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
