import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';
import { insertDetachedNodeAfterReferenceNodeForDoublyLinkedList } from './insert-after';
import { prependDetachedNodeForDoublyLinkedList } from './prepend';


/**
 * Inserts 'node' into 'list' after 'referenceNode'
 * - [...listA, referenceNode, ...listB] => [...listA, referenceNode, node, ...listB]
 * - if referenceNode is null, the node is prepend at the beginning of the list [node, ...list]
 * @see prependDetachedNodeForDoublyLinkedList
 * @see insertDetachedNodeAfterReferenceNodeForDoublyLinkedList
 */
export function attachDetachedNodeAfterReferenceNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
  referenceNode: IAttachedDoublyLinkedListNode<GValue> | null = null,
): IAttachedDoublyLinkedListNode<GValue> {
  return (referenceNode === null)
    ? prependDetachedNodeForDoublyLinkedList<GValue>(list, node)
    : insertDetachedNodeAfterReferenceNodeForDoublyLinkedList<GValue>(list, node, referenceNode);
}

/**
 * Inserts 'value' into 'list' after 'referenceNode'
 * @see attachDetachedNodeAfterReferenceNodeForDoublyLinkedList
 */
export function attachValueAfterForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
  referenceNode?: IAttachedDoublyLinkedListNode<GValue> | null,
): IAttachedDoublyLinkedListNode<GValue> {
  return attachDetachedNodeAfterReferenceNodeForDoublyLinkedList<GValue>(
    list,
    createDetachedDoublyLinkedListNode<GValue>(value),
    referenceNode,
  );
}


