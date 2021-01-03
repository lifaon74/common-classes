import {
  IDoublyLinkedListNodeStruct, IGenericDoublyLinkedListNodeStruct
} from '../../../../node/built-in/default/struct/doubly-linked-list-node-struct';

/** PRIVATE CONTEXT **/

export const DOUBLY_LINKED_LIST_PRIVATE_CONTEXT: unique symbol = Symbol('doubly-linked-list-private-context');

export interface IDoublyLinkedListPrivateContext<GNode extends IDoublyLinkedListNodeStruct<GNode, any>> {
  first: GNode | null;
}

/** STRUCT DEFINITION **/

export interface IDoublyLinkedListStruct<GNode extends IDoublyLinkedListNodeStruct<GNode, any>> {
  readonly [DOUBLY_LINKED_LIST_PRIVATE_CONTEXT]: IDoublyLinkedListPrivateContext<GNode>;
}

export type IGenericDoublyLinkedListStruct = IDoublyLinkedListStruct<IGenericDoublyLinkedListNodeStruct>;
