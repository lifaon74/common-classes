import { Trait } from '@lifaon/traits';
import { TraitDoublyLinkedListNodeSetPrevious } from '../trait-doubly-linked-list-node-set-previous/trait-doubly-linked-list-node-set-previous';
import { TraitDoublyLinkedListNodeInsertAfter } from './trait-doubly-linked-list-node-insert-after';
import { TraitDoublyLinkedListNodeGetPrevious } from '../trait-doubly-linked-list-node-get-previous/trait-doubly-linked-list-node-get-previous';
import { TraitSingleLinkedListNodeGetNext } from '../../../../single/node/traits/trait-single-linked-list-node-get-next/trait-single-linked-list-node-get-next';
import { TraitSingleLinkedListNodeSetNext } from '../../../../single/node/traits/trait-single-linked-list-node-set-next/trait-single-linked-list-node-set-next';

// export interface ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint<// generics
//   GNext extends ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGNextConstraint<any>,
//   //
//   > extends
//   // traits
//   TraitSingleLinkedListNodeGetNext<any, GNext>,
//   TraitSingleLinkedListNodeSetNext<any, GNext>
//   //
// {
// }
//
// // TraitDoublyLinkedListNodeGetPrevious<any, GPrevious>,
// // TraitSingleLinkedListNodeGetNext<any, GNext>,
// // TraitDoublyLinkedListNodeSetPrevious<any, GPrevious>,
// // TraitSingleLinkedListNodeSetNext<any, GNext>
//
// export interface ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGNextConstraint<GCurrent> extends
//   // traits
//   TraitDoublyLinkedListNodeSetPrevious<any, ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGNextConstraint<GCurrent>>,
//   TraitSingleLinkedListNodeSetNext<any, ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGNextConstraint<GCurrent>>
//   //
// {
// }
//
//
// @Trait()
// export abstract class TraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPrevious<// generics
//   GSelf extends ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint<GNext>,
//   GNext extends ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGNextConstraint<GSelf>,
//   //
//   > extends TraitDoublyLinkedListNodeInsertAfter<GSelf, GNext> {
//   insertAfter(this: GSelf, next: GNext): void {
//     const _next: GNext | null = this.getNext();
//     if (_next !== null) {
//       _next.setPrevious(next);
//     }
//     next.setNext(_next);
//     this.setNext(next);
//     next.setPrevious(this);
//   }
// }
//


export interface ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint extends
  // traits
  TraitDoublyLinkedListNodeGetPrevious<ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint>,
  TraitSingleLinkedListNodeGetNext<ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint>,
  TraitDoublyLinkedListNodeSetPrevious<ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint>,
  TraitSingleLinkedListNodeSetNext<ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint>
  //
{
}


@Trait()
export abstract class TraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPrevious<GSelf extends ITraitDoublyLinkedListNodeInsertAfterUsingGetSetNextPreviousGSelfConstraint> extends TraitDoublyLinkedListNodeInsertAfter<GSelf> {
  insertAfter(this: GSelf, node: GSelf): void {
    this.getNext().setPrevious(node);
    node.setNext(this.getNext());
    this.setNext(node);
    node.setPrevious(this);
  }
}


