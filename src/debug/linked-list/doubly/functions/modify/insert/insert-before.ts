import { IDoublyLinkedList } from '../../../doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode
} from '../../../doubly-linked-list-node-interface';
import { assignListToDetachedDoublyLinkedListNode, linkDoublyLinkedListNodes } from '../../functions';
import { createIsNodeAChildOfError } from '../../errors/errors';
import { createDetachedDoublyLinkedListNode } from '../../create/create-detached-linked-list-node';


/**
 * Inserts 'node' into 'list' before 'referenceNode'
 * [...listA, referenceNode, ...listB] => [...listA, node, referenceNode, ...listB]
 */
export function insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDetachedDoublyLinkedListNode<GValue>,
  referenceNode: IAttachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  if (referenceNode.list === list) {
    const _node: IAttachedDoublyLinkedListNode<GValue> = assignListToDetachedDoublyLinkedListNode<GValue>(node, list);
    if (referenceNode.previous === null) { // referenceNode is the first node of the list
      list.first = _node;
      _node.previous = null;
    } else {
      linkDoublyLinkedListNodes<GValue>(referenceNode.previous, _node);
    }
    linkDoublyLinkedListNodes<GValue>(_node, referenceNode);
    return _node;
  } else {
    throw createIsNodeAChildOfError('referenceNode', 'list');
  }
}

/**
 * Inserts 'value' into 'list' before 'referenceNode'
 * @see insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList
 */
export function insertValueBeforeForDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  value: GValue,
  referenceNode: IAttachedDoublyLinkedListNode<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  return insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList<GValue>(
    list,
    createDetachedDoublyLinkedListNode<GValue>(value),
    referenceNode,
  );
}

