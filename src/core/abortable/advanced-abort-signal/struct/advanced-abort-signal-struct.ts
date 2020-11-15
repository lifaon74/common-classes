import { HasProperty, IsObject } from '@lifaon/traits';
import { IEventListenerStruct } from '../../../event-listener/raw/struct/event-listener-struct';
import { TAdvancedAbortSignalKeyValueTupleUnion } from '../advanced-abort-signal-types';

/** PRIVATE CONTEXT **/

export const ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT: unique symbol = Symbol('advanced-abort-signal-private-context');

export interface IAdvancedAbortSignalPrivateContext {
  isAborted: boolean;
  reason: any | undefined;
}

export type TAdvancedAbortSignalPrivateContextFromGSelf<GSelf extends TGenericAdvancedAbortSignalStruct> = IAdvancedAbortSignalPrivateContext;


/** STRUCT DEFINITION **/

export interface IAdvancedAbortSignalStruct extends IEventListenerStruct<TAdvancedAbortSignalKeyValueTupleUnion> {
  readonly [ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT]: IAdvancedAbortSignalPrivateContext;
}

export type TGenericAdvancedAbortSignalStruct = IAdvancedAbortSignalStruct;

export function IsAdvancedAbortSignalStruct(value: any): value is IAdvancedAbortSignalStruct {
  return IsObject(value)
    && HasProperty(value, ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT);
}
