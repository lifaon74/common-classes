import { Impl } from '@lifaon/traits';
import {
  ISingleLinkedListNodeStruct, SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT
} from '../single-linked-list-node-struct';
import { TraitSingleLinkedListNodeSetNext } from '../../../../traits/trait-single-linked-list-node-set-next/trait-single-linked-list-node-set-next';


@Impl()
export class ImplTraitSetNextForSingleLinkedListNodeStruct<GSelf extends ISingleLinkedListNodeStruct> extends TraitSingleLinkedListNodeSetNext<GSelf> {
  setNext(this: GSelf, node: GSelf): void {
    this[SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT].next = node;
  }
}
