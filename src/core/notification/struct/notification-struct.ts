/** PRIVATE CONTEXT **/

export const NOTIFICATION_PRIVATE_CONTEXT: unique symbol = Symbol('notification-private-context');

export interface INotificationPrivateContext<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}

/** STRUCT DEFINITION **/

export interface INotificationStruct<GName extends string, GValue> {
  readonly [NOTIFICATION_PRIVATE_CONTEXT]: INotificationPrivateContext<GName, GValue>;
}

export type TGenericNotificationStruct = INotificationStruct<string, any>;

