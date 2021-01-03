import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeGetValue } from '../../../../../../traits/node/value/trait-linked-list-node-get-value/trait-linked-list-node-get-value';


@Impl()
export class ImplTraitGetValueForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, GValue>, GValue> extends TraitLinkedListNodeGetValue<GSelf, GValue> {
  getValue(this: GSelf): GValue {
    return this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].value;
  }
}

