import { DoublyLinkedListNode } from '../../core/list/linked/doubly/node/built-in/default/class/doubly-linked-list-node-class';


export async function debugLinkedList1() {
  const a = new DoublyLinkedListNode('a');
  const b = new DoublyLinkedListNode('b');
  const c = new DoublyLinkedListNode('c');
  const d = new DoublyLinkedListNode('d');
  const e = new DoublyLinkedListNode('e');
  const f = new DoublyLinkedListNode('f');


  console.log(a);
}

/*-------------*/

export async function debugLinkedList() {
  console.log('debugLinkedList');
  await debugLinkedList1();
}

