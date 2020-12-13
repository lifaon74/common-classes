import { HasProperty, IsObject } from '@lifaon/traits';
import { TNotificationsObserverCallback } from '../notifications-observer-types';

/** PRIVATE CONTEXT **/

export const NOTIFICATION_OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('notification-observer-private-context');

export interface INotificationsObserverPrivateContext<GName extends string, GValue> {
  readonly name: GName;
  readonly emitValue: TNotificationsObserverCallback<GValue>;
}

// export type TNotificationsObserverPrivateContextFromGSelf<GSelf extends TGenericNotificationsObserverStruct> = INotificationsObserverPrivateContext<TInferNotificationsObserverStructGName<GSelf>, TInferNotificationsObserverStructGValue<GSelf>>;


/** STRUCT DEFINITION **/

export interface INotificationsObserverStruct<GName extends string, GValue> {
  readonly [NOTIFICATION_OBSERVER_PRIVATE_CONTEXT]: INotificationsObserverPrivateContext<GName, GValue>;
}

export type TGenericNotificationsObserverStruct = INotificationsObserverStruct<string, any>;

// export type TInferNotificationsObserverStructGName<GNotificationsObserverStruct extends TGenericNotificationsObserverStruct> =
//   GNotificationsObserverStruct extends INotificationsObserverStruct<infer GName, any>
//     ? GName
//     : never;
//
// export type TInferNotificationsObserverStructGValue<GNotificationsObserverStruct extends TGenericNotificationsObserverStruct> =
//   GNotificationsObserverStruct extends INotificationsObserverStruct<any, infer GValue>
//     ? GValue
//     : never;

export function IsNotificationsObserverStruct<GName extends string, GValue>(value: any): value is INotificationsObserverStruct<GName, GValue> {
  return IsObject(value)
    && HasProperty(value, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT);
}
