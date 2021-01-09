import { IAttachedDoublyLinkedListNode } from './doubly-linked-list-node-interface';


export interface IDoublyLinkedList<GValue> {
  first: IAttachedDoublyLinkedListNode<GValue> | null;
  last: IAttachedDoublyLinkedListNode<GValue> | null;
}
