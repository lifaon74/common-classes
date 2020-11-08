import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const NOTIFICATION_PRIVATE_CONTEXT: unique symbol = Symbol('notification-private-context');

export interface INotificationPrivateContext<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}

export type TNotificationPrivateContextFromGSelf<GSelf extends TGenericNotificationStruct> = INotificationPrivateContext<TInferNotificationStructGName<GSelf>, TInferNotificationStructGValue<GSelf>>;


/** STRUCT DEFINITION **/

export interface INotificationStruct<GName extends string, GValue> {
  readonly [NOTIFICATION_PRIVATE_CONTEXT]: INotificationPrivateContext<GName, GValue>;
}

export type TGenericNotificationStruct = INotificationStruct<any, any>;

export type TInferNotificationStructGName<GNotificationStruct extends TGenericNotificationStruct> =
  GNotificationStruct extends INotificationStruct<infer GName, any>
    ? GName
    : never;

export type TInferNotificationStructGValue<GNotificationStruct extends TGenericNotificationStruct> =
  GNotificationStruct extends INotificationStruct<any, infer GValue>
    ? GValue
    : never;

export function IsNotificationStruct<GName extends string, GValue>(value: any): value is INotificationStruct<GName, GValue> {
  return IsObject(value)
    && HasProperty(value, NOTIFICATION_PRIVATE_CONTEXT);
}
