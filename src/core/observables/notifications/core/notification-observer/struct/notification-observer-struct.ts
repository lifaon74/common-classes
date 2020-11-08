import { HasProperty, IsObject } from '@lifaon/traits';
import { INotificationLike } from '../../../../../notification/notification-types';
import { IObserverStruct } from '../../../../core/observer/struct/observer-struct';

/** PRIVATE CONTEXT **/

export const NOTIFICATION_OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('notification-observer-private-context');

export interface INotificationObserverPrivateContext<GName extends string, GValue> {
  readonly name: GName;
}

export type TNotificationObserverPrivateContextFromGSelf<GSelf extends TGenericNotificationObserverStruct> = INotificationObserverPrivateContext<TInferNotificationObserverStructGName<GSelf>, TInferNotificationObserverStructGValue<GSelf>>;


/** STRUCT DEFINITION **/

export interface INotificationObserverStruct<GName extends string, GValue> extends IObserverStruct<INotificationLike<GName, GValue>> {
  readonly [NOTIFICATION_OBSERVER_PRIVATE_CONTEXT]: INotificationObserverPrivateContext<GName, GValue>;
}

export type TGenericNotificationObserverStruct = INotificationObserverStruct<any, any>;

export type TInferNotificationObserverStructGName<GNotificationObserverStruct extends TGenericNotificationObserverStruct> =
  GNotificationObserverStruct extends INotificationObserverStruct<infer GName, any>
    ? GName
    : never;

export type TInferNotificationObserverStructGValue<GNotificationObserverStruct extends TGenericNotificationObserverStruct> =
  GNotificationObserverStruct extends INotificationObserverStruct<any, infer GValue>
    ? GValue
    : never;

export function IsNotificationObserverStruct<GName extends string, GValue>(value: any): value is INotificationObserverStruct<GName, GValue> {
  return IsObject(value)
    && HasProperty(value, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT);
}
