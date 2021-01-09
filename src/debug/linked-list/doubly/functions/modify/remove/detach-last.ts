import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { removeListFromDoublyLinkedListNode } from '../../functions';
import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import { getOptionalDoublyLinkedListNodeValue } from '../../misc/get-optional-doubly-linked-list-node-value';

/**
 * Detaches and returns the last node of 'list'
 * INFO: if the list is empty, returns null
 */
export function detachLastNodeOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
): IDetachedDoublyLinkedListNode<GValue> | null {
  const node: IAttachedDoublyLinkedListNode<GValue> | null = list.last;
  if (node === null) { // non empty list
    return null;
  } else {
    const previous: IAttachedDoublyLinkedListNode<GValue> | null = node.previous;
    if (previous === null) { // single node
      list.first = null;
    } else {
      previous.next = null;
    }
    list.last = previous;
    node.previous = null;
    node.next = null;
    return removeListFromDoublyLinkedListNode<GValue>(node);
  }
}

/**
 * Detaches and returns the last value of 'list'
 * @see detachLastNodeOfDoublyLinkedList
 * INFO: if the list is empty, returns undefined
 */
export function removeLastValueOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
): GValue | undefined {
  return getOptionalDoublyLinkedListNodeValue<GValue>(detachLastNodeOfDoublyLinkedList<GValue>(list));
}

