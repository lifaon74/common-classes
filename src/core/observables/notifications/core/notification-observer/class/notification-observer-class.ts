import {
  INotificationObserverPrivateContext, INotificationObserverStruct, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
} from '../struct/notification-observer-struct';
import { ImplTraitGetNameForNotificationObserverStruct } from '../struct/implementations/notification-observer-struct-get-name-implementation';
import { ConstructObserver, IObserver, ObserverImplementations, } from '../../../../core/observer/class/observer-class';
import { TNotificationObserverCallback } from '../notification-observer-types';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { INotificationLike } from '../../../../../notification/notification-types';

/** CONSTRUCTOR **/

export function ConstructNotificationObserver<GName extends string, GValue>(
  instance: INotificationObserverStruct<GName, GValue>,
  name: GName,
  emit: TNotificationObserverCallback<GName, GValue>,
): void {
  ConstructObserver<INotificationLike<GName, GValue>>(instance, emit);

  if (typeof name !== 'string') {
    throw new TypeError(`Expected string for argument 'name'.`);
  }

  CreatePrivateContext<INotificationObserverPrivateContext<GName, GValue>>(
    NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
    instance,
    {
      name,
    },
  );
}

/** CLASS **/

export interface INotificationObserver<GName extends string, GValue> extends INotificationObserverStruct<GName, GValue>,
  ImplTraitGetNameForNotificationObserverStruct<INotificationObserver<GName, GValue>>,
  IObserver<INotificationLike<GName, GValue>> {
}

export interface IAssembledNotificationObserverImplementations {
  new<GName extends string, GValue>(): INotificationObserver<GName, GValue>;
}

export const NotificationObserverImplementationsCollection = [
  ...ObserverImplementations,
  ImplTraitGetNameForNotificationObserverStruct,
];

const AssembledNotificationObserverImplementations = AssembleTraitImplementations<IAssembledNotificationObserverImplementations>(NotificationObserverImplementationsCollection);

export class NotificationObserver<GName extends string, GValue> extends AssembledNotificationObserverImplementations<GName, GValue> implements INotificationObserver<GName, GValue> {
  readonly [NOTIFICATION_OBSERVER_PRIVATE_CONTEXT]: INotificationObserverPrivateContext<GName, GValue>;

  constructor(
    name: GName,
    emit: TNotificationObserverCallback<GName, GValue>,
  ) {
    super();
    ConstructNotificationObserver<GName, GValue>(this, name, emit);
  }
}
