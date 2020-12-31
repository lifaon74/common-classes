import { IEmitFunction, IObserver, Observer } from '../core/observer';
import { IGenericNotification, INotification, TInferNotificationGName } from '../misc/notifications/notification-interface';

export interface INotificationsObserver<GNotificationsUnion extends IGenericNotification> extends IObserver<GNotificationsUnion> {
}

export type TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion extends IGenericNotification> = {
  [GName in TInferNotificationGName<GNotificationsUnion>]?: GNotificationsUnion extends INotification<GName, infer GValue>
    ? IEmitFunction<GValue>
    : never;
}

export class NotificationsObserver<GNotificationsUnion extends IGenericNotification> extends Observer<GNotificationsUnion> implements INotificationsObserver<GNotificationsUnion> {
  constructor(
    map: TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
  ) {
    super((notification: GNotificationsUnion) => {
      if (map[notification.name] !== void 0) {
        map[notification.name](notification.value);
      }
    });
  }
}

