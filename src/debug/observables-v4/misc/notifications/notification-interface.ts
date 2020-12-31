export interface INotification<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}

export type IGenericNotification = INotification<string, any>;

export type TInferNotificationGName<GNotification extends IGenericNotification> =
  GNotification extends INotification<infer GName, any>
    ? GName
    : never;

export type TInferNotificationGValue<GNotification extends IGenericNotification> =
  GNotification extends INotification<string, infer GValue>
    ? GValue
    : never;


/* DERIVED TYPES */

export type TInferGValueFromNotificationsUnionAndName<GNotificationsUnion extends IGenericNotification, GName extends TInferNotificationGName<GNotificationsUnion>>
  = TInferNotificationGValue<Extract<GNotificationsUnion, INotification<GName, any>>>;



