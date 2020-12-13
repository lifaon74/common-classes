/** PRIVATE CONTEXT **/

export const QUEUE_PRIVATE_CONTEXT: unique symbol = Symbol('queue-private-context');

export interface IQueuePrivateContext {
  queue: Promise<void>;
}


/** STRUCT DEFINITION **/

export interface IQueueStruct {
  readonly [QUEUE_PRIVATE_CONTEXT]: IQueuePrivateContext;
}

export type TGenericQueueStruct = IQueueStruct;
