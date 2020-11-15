import {
  HasProperty, IsObject, TGenericKeyValueTupleUnion, TGenericListenerCallback, TInferKeyValueTupleUnionGKey
} from '@lifaon/traits';

/** PRIVATE TYPES **/

export interface IListener {
  callback: TGenericListenerCallback;
}

/** PRIVATE CONTEXT **/

export const EVENT_LISTENER_PRIVATE_CONTEXT: unique symbol = Symbol('event-listener-private-context');

export interface IEventListenerPrivateContext<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  listeners: Map<TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>, IListener[]>;
  isDispatching: boolean;
}

export type TEventListenerPrivateContextFromGSelf<GSelf extends TGenericEventListenerStruct> = IEventListenerPrivateContext<TInferEventListenerStructGKeyValueTupleUnion<GSelf>>;

/** STRUCT DEFINITION **/

export interface IEventListenerStruct<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<GKeyValueTupleUnion>;
}

export type TGenericEventListenerStruct = IEventListenerStruct<TGenericKeyValueTupleUnion>;

export type TInferEventListenerStructGKeyValueTupleUnion<GEventListenerStruct extends TGenericEventListenerStruct> =
  GEventListenerStruct extends IEventListenerStruct<infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

export function IsEventListenerStruct<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(value: any): value is IEventListenerStruct<GKeyValueTupleUnion> {
  return IsObject(value)
    && HasProperty(value, EVENT_LISTENER_PRIVATE_CONTEXT);
}



