import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { assignListToDetachedDoublyLinkedListNode, linkDoublyLinkedListNodes } from '../../functions';
import { createIsNodeAChildOfError } from '../../errors/errors';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';


/**
 * Inserts 'node' into 'list' after 'referenceNode'
 * [...listA, referenceNode, ...listB] => [...listA, referenceNode, node, ...listB]
 */
export function insertDetachedNodeAfterReferenceNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
  referenceNode: IAttachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  if (referenceNode.list === list) {
    const _node: IAttachedDoublyLinkedListNode<GValue> = assignListToDetachedDoublyLinkedListNode<GValue>(node, list);
    if (referenceNode.next === null) { // referenceNode is the last node of the list
      list.last = _node;
      _node.next = null;
    } else {
      linkDoublyLinkedListNodes<GValue>(_node, referenceNode.next);
    }
    linkDoublyLinkedListNodes<GValue>(referenceNode, _node);
    return _node;
  } else {
    throw createIsNodeAChildOfError('referenceNode', 'list');
  }
}

/**
 * Inserts 'value' into 'list' after 'referenceNode'
 * @see insertDetachedNodeAfterReferenceNodeForDoublyLinkedList
 */
export function insertValueAfterForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
  referenceNode: IAttachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  return insertDetachedNodeAfterReferenceNodeForDoublyLinkedList<GValue>(
    list,
    createDetachedDoublyLinkedListNode<GValue>(value),
    referenceNode,
  );
}

