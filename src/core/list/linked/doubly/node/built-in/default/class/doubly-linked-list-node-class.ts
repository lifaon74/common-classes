import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitGetNextForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-get-next-implementation';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodePrivateContext, IDoublyLinkedListNodeStruct
} from '../struct/doubly-linked-list-node-struct';
import { ImplTraitSetNextForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-set-next-implementation';
import { ImplTraitSetPreviousForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-set-previous-implementation';
import { ImplTraitGetPreviousForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-get-previous-implementation';
import { ImplTraitSetValueForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-set-value-implementation';
import { ImplTraitGetValueForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-get-value-implementation';
import { ImplTraitNextIteratorForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-next-iterator-implementation';
import { ImplTraitGetSizeForDoublyLinkedListNodeStruct } from '../struct/implementations/doubly-linked-list-node-struct-get-size-implementation';

/** CONSTRUCTOR **/

export function ConstructDoublyLinkedListNode<GValue>(
  instance: IDoublyLinkedListNode<GValue>,
  value: GValue,
): void {
  CreatePrivateContext<IDoublyLinkedListNodePrivateContext<IDoublyLinkedListNode<GValue>, GValue>>(
    DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT,
    instance,
    {
      previous: instance,
      next: instance,
      value: value,
    },
  );
}


/** CLASS **/

// FOR PROTOTYPE

export interface IDoublyLinkedListNodeImplementations<GValue> extends
  // implementations

  // previous
  ImplTraitGetPreviousForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>,
  ImplTraitSetPreviousForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>,
  // next
  ImplTraitGetNextForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>,
  ImplTraitSetNextForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>,
  // value
  ImplTraitGetValueForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>, GValue>,
  ImplTraitSetValueForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>, GValue>,
  // iterators
  ImplTraitNextIteratorForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>,
  // others
  ImplTraitGetSizeForDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>>
  //
{
}

export const DoublyLinkedListNodeImplementations = [
  // previous
  ImplTraitGetPreviousForDoublyLinkedListNodeStruct,
  ImplTraitSetPreviousForDoublyLinkedListNodeStruct,
  // next
  ImplTraitGetNextForDoublyLinkedListNodeStruct,
  ImplTraitSetNextForDoublyLinkedListNodeStruct,
  // value
  ImplTraitGetValueForDoublyLinkedListNodeStruct,
  ImplTraitSetValueForDoublyLinkedListNodeStruct,
  // iterators
  ImplTraitNextIteratorForDoublyLinkedListNodeStruct,
  // others
  ImplTraitNextIteratorForDoublyLinkedListNodeStruct,
  // others
  ImplTraitGetSizeForDoublyLinkedListNodeStruct,
];

export interface IDoublyLinkedListNodeImplementationsConstructor {
  new<GValue>(): IDoublyLinkedListNode<GValue>;
}

export interface IDoublyLinkedListNode<GValue> extends IDoublyLinkedListNodeStruct<IDoublyLinkedListNode<GValue>, GValue>, IDoublyLinkedListNodeImplementations<GValue> {
}


const DoublyLinkedListNodeImplementationsConstructor = AssembleTraitImplementations<IDoublyLinkedListNodeImplementationsConstructor>(DoublyLinkedListNodeImplementations);

export class DoublyLinkedListNode<GValue> extends DoublyLinkedListNodeImplementationsConstructor<GValue> implements IDoublyLinkedListNode<GValue> {
  readonly [DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT]: IDoublyLinkedListNodePrivateContext<IDoublyLinkedListNode<GValue>, GValue>;

  constructor(
    value: GValue,
  ) {
    super();
    ConstructDoublyLinkedListNode<GValue>(this, value);
  }

}
