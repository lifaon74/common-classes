import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeSetPrevious } from '../../../../../../traits/node/previous/trait-linked-list-node-set-previous/trait-linked-list-node-set-previous';


@Impl()
export class ImplTraitSetPreviousForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, any>> extends TraitLinkedListNodeSetPrevious<GSelf> {
  setPrevious(this: GSelf, node: GSelf): void {
    this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].previous = node;
  }
}

