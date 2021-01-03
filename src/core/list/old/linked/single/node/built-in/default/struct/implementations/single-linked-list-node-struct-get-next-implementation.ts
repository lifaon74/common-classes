import { Impl } from '@lifaon/traits';
import { TraitSingleLinkedListNodeGetNext } from '../../../../traits/trait-single-linked-list-node-get-next/trait-single-linked-list-node-get-next';
import {
  ISingleLinkedListNodeStruct, SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT
} from '../single-linked-list-node-struct';


@Impl()
export class ImplTraitGetNextForSingleLinkedListNodeStruct<GSelf extends ISingleLinkedListNodeStruct> extends TraitSingleLinkedListNodeGetNext<ISingleLinkedListNodeStruct> {
  getNext(this: GSelf): ISingleLinkedListNodeStruct {
    return this[SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT].next;
  }
}

