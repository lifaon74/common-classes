import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { removeListFromDoublyLinkedListNode } from '../../functions';
import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import { getOptionalDoublyLinkedListNodeValue } from '../../misc/get-optional-doubly-linked-list-node-value';

/**
 * Detaches and returns the first node of 'list'
 * INFO: if the list is empty, returns null
 */
export function detachFirstNodeOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
): IDetachedDoublyLinkedListNode<GValue> | null {
  const node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
  if (node === null) { // non empty list
    return null;
  } else {
    const next: IAttachedDoublyLinkedListNode<GValue> | null = node.next;
    if (next === null) { // single node
      list.last = null;
    } else {
      next.previous = null;
    }
    list.first = next;
    node.previous = null;
    node.next = null;
    return removeListFromDoublyLinkedListNode<GValue>(node);
  }
}

/**
 * Detaches and returns the first value of 'list'
 * @see detachFirstNodeOfDoublyLinkedList
 * INFO: if the list is empty, returns undefined
 */
export function removeFirstValueOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
): GValue | undefined {
  return getOptionalDoublyLinkedListNodeValue<GValue>(detachFirstNodeOfDoublyLinkedList<GValue>(list));
}

