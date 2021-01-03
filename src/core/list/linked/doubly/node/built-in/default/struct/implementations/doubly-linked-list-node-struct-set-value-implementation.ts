import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT, IDoublyLinkedListNodeStruct
} from '../doubly-linked-list-node-struct';
import { TraitLinkedListNodeSetValue } from '../../../../../../traits/node/value/trait-linked-list-node-set-value/trait-linked-list-node-set-value';


@Impl()
export class ImplTraitSetValueForDoublyLinkedListNodeStruct<GSelf extends IDoublyLinkedListNodeStruct<GSelf, GValue>, GValue> extends TraitLinkedListNodeSetValue<GSelf, GValue> {
  setValue(this: GSelf, value: GValue): void {
    this[DOUBLY_LINKED_LIST_NODE_PRIVATE_CONTEXT].value = value;
  }
}

