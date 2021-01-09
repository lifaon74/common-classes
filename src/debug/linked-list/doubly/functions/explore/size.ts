import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { IAttachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';

/**
 * Returns the number of nodes inside 'list'
 */
export function getDoublyLinkedListSize<GValue>(
  list: IDoublyLinkedList<GValue>,
): number {
  let size: number = 0;
  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
  while (node !== null) {
    size++;
    node = node.next;
  }
  return size;
}
