import { IAttachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';
import { IDoublyLinkedList } from '../../doubly-linked-list-interface';


export function createAttachedDoublyLinkedListNode<GValue>(
  previous: IAttachedDoublyLinkedListNode<GValue>,
  next: IAttachedDoublyLinkedListNode<GValue>,
  list: IDoublyLinkedList<GValue>,
  value: GValue,
): IAttachedDoublyLinkedListNode<GValue> {
  return {
    previous,
    next,
    list,
    value,
  };
}

