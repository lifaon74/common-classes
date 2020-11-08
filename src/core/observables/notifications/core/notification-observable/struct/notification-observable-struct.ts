import { IObservableStruct } from '../../../../core/observable/struct/observable-struct';
import { TInferNotificationObserversFromEventMap } from '../notification-observable-types';
import { HasProperty, IsObject, TEventMap, TInferEventMapKeys } from '@lifaon/traits';


// TODO continue here => do not inherith from IObservableStruct because we dont actually need observables[]

/** PRIVATE CONTEXT **/

export const NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('notification-observable-private-context');

export interface INotificationObservablePrivateContext<GEventMap extends TEventMap> {
  readonly observersMap: Map<TInferEventMapKeys<GEventMap>, TInferNotificationObserversFromEventMap<GEventMap>[]>; // map from a name to a list of notifications observers
}

export type TNotificationObservablePrivateContextFromGSelf<GSelf extends TGenericNotificationObservableStruct> = INotificationObservablePrivateContext<TInferNotificationObservableStructGEventMap<GSelf>>;


/** STRUCT DEFINITION **/

export interface INotificationObservableStruct<GEventMap extends TEventMap> extends IObservableStruct<TInferNotificationObserversFromEventMap<GEventMap>> {
  readonly [NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT]: INotificationObservablePrivateContext<GEventMap>;
}

export type TGenericNotificationObservableStruct = INotificationObservableStruct<any>;

export type TInferNotificationObservableStructGEventMap<GNotificationObservableStruct extends TGenericNotificationObservableStruct> =
  GNotificationObservableStruct extends INotificationObservableStruct<infer GEventMap>
    ? GEventMap
    : never;


export function IsNotificationObservableStruct<GEventMap extends TEventMap>(value: any): value is INotificationObservableStruct<GEventMap> {
  return IsObject(value)
    && HasProperty(value, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT);
}
