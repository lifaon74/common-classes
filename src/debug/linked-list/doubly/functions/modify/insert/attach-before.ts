import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';
import { insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList } from './insert-before';
import { appendDetachedNodeForDoublyLinkedList } from './append';


/**
 * Inserts 'node' into 'list' before 'referenceNode'
 * - [...listA, referenceNode, ...listB] => [...listA, node, referenceNode, ...listB]
 * - if referenceNode is null, the node is append at the end of the list [...list, node]
 * @see appendDetachedNodeForDoublyLinkedList
 * @see insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList
 */
export function attachDetachedNodeBeforeReferenceNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
  referenceNode: IAttachedDoublyLinkedListNode<GValue> | null = null,
): IAttachedDoublyLinkedListNode<GValue> {
  return (referenceNode === null)
    ? appendDetachedNodeForDoublyLinkedList<GValue>(list, node)
    : insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList<GValue>(list, node, referenceNode);
}

/**
 * Inserts 'value' into 'list' before 'referenceNode'
 * @see attachDetachedNodeBeforeReferenceNodeForDoublyLinkedList
 */
export function attachValueBeforeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
  referenceNode?: IAttachedDoublyLinkedListNode<GValue> | null,
): IAttachedDoublyLinkedListNode<GValue> {
  return attachDetachedNodeBeforeReferenceNodeForDoublyLinkedList<GValue>(
    list,
    createDetachedDoublyLinkedListNode<GValue>(value),
    referenceNode,
  );
}


