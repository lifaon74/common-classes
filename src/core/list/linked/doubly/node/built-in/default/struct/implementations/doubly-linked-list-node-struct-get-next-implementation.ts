import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeGetNext } from '../../../../../../traits/node/next/trait-linked-list-node-get-next/trait-linked-list-node-get-next';


@Impl()
export class ImplTraitGetNextForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, any>> extends TraitLinkedListNodeGetNext<GSelf> {
  getNext(this: GSelf): GSelf {
    return this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].next;
  }
}

