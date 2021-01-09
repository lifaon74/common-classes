import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { assignListToDetachedDoublyLinkedListNode, linkDoublyLinkedListNodes } from '../../functions';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';

/**
 * Appends 'node' into 'list'
 * [...list] => [...list, node]
 */
export function appendDetachedNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  const _node: IAttachedDoublyLinkedListNode<GValue> = assignListToDetachedDoublyLinkedListNode<GValue>(node, list);
  if (list.last === null) { // empty list
    list.first = _node;
    _node.previous = null;
  } else {
    linkDoublyLinkedListNodes<GValue>(list.last, _node);
  }
  list.last = _node;
  _node.next = null;
  return _node;
}


/**
 * Appends 'value' into 'list'
 * @see appendDetachedNodeForDoublyLinkedList
 */
export function appendValueForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
): IAttachedDoublyLinkedListNode<GValue> {
  return appendDetachedNodeForDoublyLinkedList<GValue>(list, createDetachedDoublyLinkedListNode<GValue>(value));
}



