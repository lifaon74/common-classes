import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { IAttachedDoublyLinkedListNode, IDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';


/**
 * Returns the index of 'node' inside 'list' from start
 * INFO: returns -1 if node is not in the list
 */
export function indexOfNodeFromStartInDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDoublyLinkedListNode<GValue>,
): number {
  if (node.list === list) {
    let index: number = 0;
    let _node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
    while (_node !== null) {
      index++;
      if (_node === node) {
        return index;
      }
      _node = _node.next;
    }
  }
  return -1;
}

/**
 * Returns the index of 'node' inside 'list' from end
 * INFO: returns -1 if node is not in the list
 */
export function indexOfNodeFromEndInDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  node: IDoublyLinkedListNode<GValue>,
): number {
  if (node.list === list) {
    let index: number = 0;
    let _node: IAttachedDoublyLinkedListNode<GValue> | null = list.last;
    while (_node !== null) {
      index++;
      if (_node === node) {
        return index;
      }
      _node = _node.previous;
    }
  }
  return -1;
}

