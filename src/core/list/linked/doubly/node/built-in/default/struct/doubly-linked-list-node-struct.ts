/** PRIVATE CONTEXT **/

export const DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT: unique symbol = Symbol('doubly-linked-list-node-private-context');

export interface IDoublyLinkedListNodePrivateContext<// generics
  GSelf extends IDoublyLinkedListNodeStruct<GSelf, GValue>,
  GValue
  //
  > {
  previous: GSelf;
  next: GSelf;
  value: GValue;
}

/** STRUCT DEFINITION **/

export interface IDoublyLinkedListNodeStruct<// generics
  GSelf extends IDoublyLinkedListNodeStruct<GSelf, GValue>,
  GValue
  //
  > {
  readonly [DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT]: IDoublyLinkedListNodePrivateContext<GSelf, GValue>;
}

export type IGenericDoublyLinkedListNodeStruct = IDoublyLinkedListNodeStruct<IGenericDoublyLinkedListNodeStruct, any>;
