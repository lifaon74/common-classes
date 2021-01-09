import { testDoublyLinkedList } from './doubly/test-coubly-linked-list';


export async function debugLinkedList1() {
  await testDoublyLinkedList();
}

/*-------------*/

export async function debugLinkedList() {
  await debugLinkedList1();
}

