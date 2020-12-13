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
