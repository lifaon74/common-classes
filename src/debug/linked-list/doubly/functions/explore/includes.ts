import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { IDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';

/**
 * Returns true if 'list' has 'node'
 */
export function doublyLinkedListIncludesNode<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDoublyLinkedListNode<GValue>,
): boolean {
  return node.list === list;
}

