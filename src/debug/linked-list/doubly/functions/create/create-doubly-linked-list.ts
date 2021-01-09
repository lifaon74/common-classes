import { IDoublyLinkedList } from '../../doubly-linked-list-interface';

export function createDoublyLinkedList<GValue>(): IDoublyLinkedList<GValue> {
  return {
    first: null,
    last: null,
  };
}
