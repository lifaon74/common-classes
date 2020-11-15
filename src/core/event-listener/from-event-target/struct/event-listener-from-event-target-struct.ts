import { HasProperty, IsObject } from '@lifaon/traits';
import { ITypedEventTarget, TGenericEventKeyValueTupleUnion } from '../event-target-types';

/** PRIVATE CONTEXT **/

export const EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT: unique symbol = Symbol('event-listener-from-event-target-private-context');

export interface IEventListenerFromEventTargetPrivateContext<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> {
  eventTarget: ITypedEventTarget<GKeyValueTupleUnion>;
  isDispatching: boolean;
}

export type TEventListenerFromEventTargetPrivateContextFromGSelf<GSelf extends TGenericEventListenerFromEventTargetStruct> = IEventListenerFromEventTargetPrivateContext<TInferEventListenerFromEventTargetStructGKeyValueTupleUnion<GSelf>>;

/** STRUCT DEFINITION **/

export interface IEventListenerFromEventTargetStruct<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> {
  readonly [EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT]: IEventListenerFromEventTargetPrivateContext<GKeyValueTupleUnion>;
}

export type TGenericEventListenerFromEventTargetStruct = IEventListenerFromEventTargetStruct<TGenericEventKeyValueTupleUnion>;

export type TInferEventListenerFromEventTargetStructGKeyValueTupleUnion<GEventListenerFromEventTargetStruct extends TGenericEventListenerFromEventTargetStruct> =
  GEventListenerFromEventTargetStruct extends IEventListenerFromEventTargetStruct<infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

export function IsEventListenerFromEventTargetStruct<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion>(value: any): value is IEventListenerFromEventTargetStruct<GKeyValueTupleUnion> {
  return IsObject(value)
    && HasProperty(value, EVENT_LISTENER_FROM_EVENT_TARGET_PRIVATE_CONTEXT);
}



