import { IDoublyLinkedList } from './doubly-linked-list-interface';

// export interface IDoublyLinkedListNodeBase<GValue> {
//   previous: IAttachedDoublyLinkedListNode<GValue> | null;
//   next: IAttachedDoublyLinkedListNode<GValue> | null;
//   value: GValue;
// }
//
// export interface IDetachedDoublyLinkedListNode<GValue> extends IDoublyLinkedListNodeBase<GValue> {
//   previous: null;
//   next: null;
//   list: null;
// }
//
// export interface IAttachedDoublyLinkedListNode<GValue> extends IDoublyLinkedListNodeBase<GValue> {
//   list: IDoublyLinkedList<GValue>;
// }

export interface IDetachedDoublyLinkedListNode<GValue> {
  previous: null;
  next: null;
  list: null;
  value: GValue;
}

export interface IAttachedDoublyLinkedListNode<GValue> {
  previous: IAttachedDoublyLinkedListNode<GValue> | null;
  next: IAttachedDoublyLinkedListNode<GValue> | null;
  list: IDoublyLinkedList<GValue>;
  value: GValue;
}


export interface IGenericDoublyLinkedListNode<GValue> {
  previous: IAttachedDoublyLinkedListNode<GValue> | null;
  next: IAttachedDoublyLinkedListNode<GValue> | null;
  list: IDoublyLinkedList<GValue> | null;
  value: GValue;
}

export type IDoublyLinkedListNode<GValue> =
  IDetachedDoublyLinkedListNode<GValue>
  | IAttachedDoublyLinkedListNode<GValue>
  ;


