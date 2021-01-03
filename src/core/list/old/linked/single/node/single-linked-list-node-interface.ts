import { TraitSingleLinkedListNodeGetNext } from './traits/trait-single-linked-list-node-get-next/trait-single-linked-list-node-get-next';
import { TraitSingleLinkedListNodeSetNext } from './traits/trait-single-linked-list-node-set-next/trait-single-linked-list-node-set-next';

export interface ISingleLinkedListNodeLike<GSelf extends ISingleLinkedListNodeLike<any>> extends
  // traits
  TraitSingleLinkedListNodeGetNext<GSelf>,
  TraitSingleLinkedListNodeSetNext<GSelf>
  //
{
}
