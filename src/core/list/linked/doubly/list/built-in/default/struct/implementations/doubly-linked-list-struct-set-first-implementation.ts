import { Impl } from '@lifaon/traits';
import {
  DOUBLY_LINKED_LIST_PRIVATE_CONTEXT, IDoublyLinkedListStruct
} from '../doubly-linked-list-struct';
import { TraitLinkedListSetNext } from '../../../../../../traits//trait-linked-list--set-next/trait-linked-list--set-next';


@Impl()
export class ImplTraitSetNextForDoublyLinkedListStruct<GSelf extends IDoublyLinkedListStruct<GSelf, any>> extends TraitLinkedListSetNext<GSelf> {
  setNext(this: GSelf, : GSelf): void {
    this[DOUBLY_LINKED_LIST_PRIVATE_CONTEXT].next = ;
  }
}

