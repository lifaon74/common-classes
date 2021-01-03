import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeGetPrevious } from '../../../../../../traits/node/previous/trait-linked-list-node-get-previous/trait-linked-list-node-get-previous';


@Impl()
export class ImplTraitGetPreviousForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, any>> extends TraitLinkedListNodeGetPrevious<GSelf> {
  getPrevious(this: GSelf): GSelf {
    return this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].previous;
  }
}

