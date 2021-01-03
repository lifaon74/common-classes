import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeSetNext } from '../../../../../../traits/node/next/trait-linked-list-node-set-next/trait-linked-list-node-set-next';


@Impl()
export class ImplTraitSetNextForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, any>> extends TraitLinkedListNodeSetNext<GSelf> {
  setNext(this: GSelf, node: GSelf): void {
    this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].next = node;
  }
}

