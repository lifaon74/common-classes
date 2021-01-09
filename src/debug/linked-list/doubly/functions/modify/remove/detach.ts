import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { removeListFromDoublyLinkedListNode } from '../../functions';

/**
 * Detaches 'node' from its list
 */
export function detachAttachedDoublyLinkedListNode<GValue>(
  node: IAttachedDoublyLinkedListNode<GValue>,
): IDetachedDoublyLinkedListNode<GValue> {
  const previous: IAttachedDoublyLinkedListNode<GValue> | null = node.previous;
  const next: IAttachedDoublyLinkedListNode<GValue> | null = node.next;

  if (previous === null) { // first of the list
    node.list.first = next;
  } else {
    previous.next = next;
    node.previous = null;
  }

  if (next === null) { // last of the list
    node.list.last = previous;
  } else {
    next.previous = previous;
    node.next = null;
  }

  return removeListFromDoublyLinkedListNode<GValue>(node);
}



