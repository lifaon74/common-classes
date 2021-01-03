import { Impl } from '@lifaon/traits';
import { DOUBLY_LINKED_LIST_PRIVATE_CONTEXT, IDoublyLinkedListStruct } from '../doubly-linked-list-struct';
import { IDoublyLinkedListNodeStruct } from '../../../../../node/built-in/default/struct/doubly-linked-list-node-struct';
import { TraitLinkedListGetFirst } from '../../../../../../traits/list/trait-linked-list-get-first/trait-linked-list-get-first';


@Impl()
export class ImplTraitGetNextForDoublyLinkedListStruct<GSelf extends IDoublyLinkedListStruct<GNode>, GNode extends IDoublyLinkedListNodeStruct<GNode, any>> extends TraitLinkedListGetFirst<GSelf, GNode> {
  getFirst(this: GSelf): GNode | null {
    return this[DOUBLY_LINKED_LIST_PRIVATE_CONTEXT].first;
  }
}

