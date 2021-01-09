import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode, IDoublyLinkedListNode
} from '../doubly-linked-list-node-interface';
import { IDoublyLinkedList } from '../doubly-linked-list-interface';


export function assignListToDetachedDoublyLinkedListNode<GValue>(
  node: IDetachedDoublyLinkedListNode<GValue>,
  list: IDoublyLinkedList<GValue>,
): IAttachedDoublyLinkedListNode<GValue> {
  (node as any).list = list;
  return node as unknown as IAttachedDoublyLinkedListNode<GValue>;
}

export function removeListFromDoublyLinkedListNode<GValue>(
  node: IAttachedDoublyLinkedListNode<GValue>,
): IDetachedDoublyLinkedListNode<GValue> {
  (node as any).list = null;
  return node as unknown as IDetachedDoublyLinkedListNode<GValue>;
}


export function doublyLinkedListNodeIsDetached<GValue>(
  node: IDoublyLinkedListNode<GValue>,
): node is IDetachedDoublyLinkedListNode<GValue> {
  return node.list === null;
}

export function doublyLinkedListNodeIsAttached<GValue>(
  node: IDoublyLinkedListNode<GValue>,
): node is IAttachedDoublyLinkedListNode<GValue> {
  return node.list !== null;
}


/**
 * Creates a link between two nodes: nodeA <-->>--> nodeB
 * [...A, nodeA, nodeB, ...B]
 * INFO: A.next and B.previous are not modified
 */
export function linkDoublyLinkedListNodes<GValue>(
  nodeA: IAttachedDoublyLinkedListNode<GValue>,
  nodeB: IAttachedDoublyLinkedListNode<GValue>,
): void {
  nodeA.next = nodeB;
  nodeB.previous = nodeA;
}

