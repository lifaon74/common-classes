import { IDetachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';


export function createDetachedDoublyLinkedListNode<GValue>(
  value: GValue,
): IDetachedDoublyLinkedListNode<GValue> {
  return {
    previous: null,
    next: null,
    list: null,
    value,
  };
}
