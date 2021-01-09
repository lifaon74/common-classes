import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { assignListToDetachedDoublyLinkedListNode, linkDoublyLinkedListNodes } from '../../functions';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';

/**
 * Prepends 'node' into 'list'
 * [...list] => [node, ...list]
 */
export function prependDetachedNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  const _node: IAttachedDoublyLinkedListNode<GValue> = assignListToDetachedDoublyLinkedListNode<GValue>(node, list);
  if (list.first === null) { // empty list
    list.last = _node;
    _node.next = null;
  } else {
    linkDoublyLinkedListNodes<GValue>(_node, list.first);
  }
  list.first = _node;
  _node.previous = null;
  return _node;
}

/**
 * Prepends 'value' into 'list'
 * @see prependDetachedNodeForDoublyLinkedList
 */
export function prependValueForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
): IAttachedDoublyLinkedListNode<GValue> {
  return prependDetachedNodeForDoublyLinkedList<GValue>(list, createDetachedDoublyLinkedListNode<GValue>(value));
}



