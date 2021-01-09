import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { createDoublyLinkedList } from './create-doubly-linked-list';
import { IAttachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';

/**
 * Creates a DoublyLinkedList from a list of values
 */
export function createDoublyLinkedListFromValues<GValue>(
  values: Iterable<GValue>
): IDoublyLinkedList<GValue> {
  const list: IDoublyLinkedList<GValue> = createDoublyLinkedList<GValue>();
  const iterator: Iterator<GValue> = values[Symbol.iterator]();
  let result: IteratorResult<GValue>;

  if (!(result = iterator.next()).done) {
    list.first = {
      previous: list.last,
      next: null,
      list,
      value: result.value,
    };
    list.last = list.first;

    while (!(result = iterator.next()).done) {
      const last: IAttachedDoublyLinkedListNode<GValue> = {
        previous: list.last,
        next: null,
        list,
        value: result.value,
      };
      list.last.next = last;
      list.last = last;
    }
  }
  return list;
}

