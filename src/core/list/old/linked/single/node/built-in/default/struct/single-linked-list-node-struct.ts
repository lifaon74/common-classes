/** PRIVATE CONTEXT **/

export const SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT: unique symbol = Symbol('single-linked-list-node-private-context');

export interface ISingleLinkedListNodePrivateContext {
  next: ISingleLinkedListNodeStruct;
}


/** STRUCT DEFINITION **/

export interface ISingleLinkedListNodeStruct {
  readonly [SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT]: ISingleLinkedListNodePrivateContext;
}
