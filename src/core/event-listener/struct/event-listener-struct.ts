/** TYPES **/
import { HasProperty, IsObject, TEventMap, TGenericListenerCallback, TInferEventMapKeys } from '@lifaon/traits';

/** PRIVATE TYPES **/

export interface IListener {
  callback: TGenericListenerCallback;
}

/** PRIVATE CONTEXT **/

export const EVENT_LISTENER_PRIVATE_CONTEXT: unique symbol = Symbol('event-listener-private-context');

export interface IEventListenerPrivateContext<GEventMap extends TEventMap> {
  listeners: Map<TInferEventMapKeys<GEventMap>, IListener[]>;
  isDispatching: boolean;
}

export type TEventListenerPrivateContextFromGSelf<GSelf extends TGenericEventListenerStruct> = IEventListenerPrivateContext<TInferEventListenerStructGEventMap<GSelf>>;

/** STRUCT DEFINITION **/

export interface IEventListenerStruct<GEventMap extends TEventMap> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<GEventMap>;
}

export type TGenericEventListenerStruct = IEventListenerStruct<any>;

export type TInferEventListenerStructGEventMap<GEventListenerStruct extends TGenericEventListenerStruct> =
  GEventListenerStruct extends IEventListenerStruct<infer GEventMap>
    ? GEventMap
    : never;

export function IsEventListenerStruct<GEventMap extends TEventMap>(value: any): value is IEventListenerStruct<GEventMap> {
  return IsObject(value)
    && HasProperty(value, EVENT_LISTENER_PRIVATE_CONTEXT);
}



