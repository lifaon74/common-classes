import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const QUEUE_PRIVATE_CONTEXT: unique symbol = Symbol('queue-private-context');

export interface IQueuePrivateContext {
  queue: Promise<void>;
}

export type TQueuePrivateContextFromGSelf<GSelf extends TGenericQueueStruct> = IQueuePrivateContext;


/** STRUCT DEFINITION **/

export interface IQueueStruct {
  readonly [QUEUE_PRIVATE_CONTEXT]: IQueuePrivateContext;
}

export type TGenericQueueStruct = IQueueStruct;

export function IsQueueStruct(value: any): value is IQueueStruct {
  return IsObject(value)
    && HasProperty(value, QUEUE_PRIVATE_CONTEXT);
}
