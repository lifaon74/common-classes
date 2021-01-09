import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { IAttachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';

/**
 * Creates an iterator over the nodes of a DoublyLinkedList (from first to last)
 */
export function * createDoublyLinkedListFirstToLastNodeIterator<GValue>(
  list: IDoublyLinkedList<GValue>,
): Generator<IAttachedDoublyLinkedListNode<GValue>> {
  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
  while (node !== null) {
    yield node;
    node = node.next;
  }
}

/**
 * Creates an iterator over the values of a DoublyLinkedList (from first to last)
 */
export function * createDoublyLinkedListFirstToLastValueIterator<GValue>(
  list: IDoublyLinkedList<GValue>,
): Generator<GValue> {
  const iterator: Iterator<IAttachedDoublyLinkedListNode<GValue>> = createDoublyLinkedListFirstToLastNodeIterator<GValue>(list);
  let result: IteratorResult<IAttachedDoublyLinkedListNode<GValue>>;
  while (!(result = iterator.next()).done) {
    yield result.value.value;
  }
}

/**
 * Creates an iterator over the nodes of a DoublyLinkedList (from last to first)
 */
export function * createDoublyLinkedListLastToFirstNodeIterator<GValue>(
  list: IDoublyLinkedList<GValue>,
): Generator<IAttachedDoublyLinkedListNode<GValue>> {
  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.last;
  while (node !== null) {
    yield node;
    node = node.previous;
  }
}

/**
 * Creates an iterator over the values of a DoublyLinkedList (from last to first)
 */
export function * createDoublyLinkedListLastToFirstValueIterator<GValue>(
  list: IDoublyLinkedList<GValue>,
): Generator<GValue> {
  const iterator: Iterator<IAttachedDoublyLinkedListNode<GValue>> = createDoublyLinkedListLastToFirstNodeIterator<GValue>(list);
  let result: IteratorResult<IAttachedDoublyLinkedListNode<GValue>>;
  while (!(result = iterator.next()).done) {
    yield result.value.value;
  }
}

