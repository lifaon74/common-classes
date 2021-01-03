import { Trait } from '@lifaon/traits';
import { TraitDoublyLinkedListNodeEntangle } from './trait-doubly-linked-list-node-entangle';
import { TraitLinkedListNodeGetNext } from 'src/core/list/linked/traits/node/next/trait-linked-list-node-get-next/trait-linked-list-node-get-next';
import { TraitLinkedListNodeSetNext } from 'src/core/list/linked/traits/node/next/trait-linked-list-node-set-next/trait-linked-list-node-set-next';
import { TraitLinkedListNodeGetPrevious } from 'src/core/list/linked/traits/node/previous/trait-linked-list-node-get-previous/trait-linked-list-node-get-previous';
import { TraitLinkedListNodeSetPrevious } from 'src/core/list/linked/traits/node/previous/trait-linked-list-node-set-previous/trait-linked-list-node-set-previous';


export interface ITraitDoublyLinkedListNodeEntangleUsingGetSetNextAndPreviousGSelfConstraint<GSelf> extends
  // traits
  TraitLinkedListNodeGetNext<GSelf>,
  TraitLinkedListNodeSetNext<GSelf>,
  TraitLinkedListNodeGetPrevious<GSelf>,
  TraitLinkedListNodeSetPrevious<GSelf>
  //
{
}

@Trait()
export abstract class TraitDoublyLinkedListNodeEntangleUsingGetSetNextAndPrevious<GSelf extends ITraitDoublyLinkedListNodeEntangleUsingGetSetNextAndPreviousGSelfConstraint<GSelf>> extends TraitDoublyLinkedListNodeEntangle<GSelf> {
  entangle(this: GSelf, before: GSelf): void {
    const beforePrevious: GSelf =  before.getPrevious();
    const thisPrevious: GSelf = this.getPrevious();
    beforePrevious.setNext(this);
    this.setPrevious(beforePrevious);
    thisPrevious.setNext(before);
    before.setPrevious(thisPrevious);
  }
}


