import {
  INotificationsObserverPrivateContext, INotificationsObserverStruct, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
} from '../notifications-observer-struct';
import { Impl } from '@lifaon/traits';
import { TraitObserverEmit } from '../../../../../core/observer/traits/trait-observer-emit';
import { INotificationLike } from '../../../../../../notification/notification-types';


@Impl()
export class ImplTraitEmitForNotificationsObserverStruct<GSelf extends INotificationsObserverStruct<GName, GValue>, GName extends string, GValue> extends TraitObserverEmit<GSelf, INotificationLike<GName, GValue>> {
  emit(this: GSelf, notification: INotificationLike<GName, GValue>): void {
    const context: INotificationsObserverPrivateContext<GName, GValue> = this[NOTIFICATION_OBSERVER_PRIVATE_CONTEXT];
    if (notification.getName() === context.name) {
      context.emitValue(notification.getValue());
    }
  }
}
