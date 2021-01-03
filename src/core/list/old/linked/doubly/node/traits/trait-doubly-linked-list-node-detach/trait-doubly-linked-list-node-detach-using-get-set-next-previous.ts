import { Trait } from '@lifaon/traits';
import { TraitSingleLinkedListNodeGetNext } from 'src/core/list/linked/single/node/traits/trait-single-linked-list-node-get-next/trait-single-linked-list-node-get-next';
import { TraitSingleLinkedListNodeSetNext } from 'src/core/list/linked/single/node/traits/trait-single-linked-list-node-set-next/trait-single-linked-list-node-set-next';
import { TraitDoublyLinkedListNodeGetPrevious } from '../trait-doubly-linked-list-node-get-previous/trait-doubly-linked-list-node-get-previous';
import { TraitDoublyLinkedListNodeSetPrevious } from '../trait-doubly-linked-list-node-set-previous/trait-doubly-linked-list-node-set-previous';
import { TraitDoublyLinkedListNodeDetach } from './trait-doubly-linked-list-node-detach';


export interface ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint extends
  // traits
  TraitDoublyLinkedListNodeGetPrevious<ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint>,
  TraitSingleLinkedListNodeGetNext<ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint>,
  TraitDoublyLinkedListNodeSetPrevious<ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint>,
  TraitSingleLinkedListNodeSetNext<ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint>
  //
{
}

@Trait()
export abstract class TraitDoublyLinkedListNodeDetachUsingGetSetNextPrevious<GSelf extends ITraitDoublyLinkedListNodeDetachUsingGetSetNextPreviousGSelfConstraint> extends TraitDoublyLinkedListNodeDetach<GSelf> {
  detach(this: GSelf): void {
    this.getPrevious().setNext(this.getNext());
    this.getNext().setPrevious(this.getPrevious());
    this.setPrevious(this);
    this.setNext(this);
  }
}


