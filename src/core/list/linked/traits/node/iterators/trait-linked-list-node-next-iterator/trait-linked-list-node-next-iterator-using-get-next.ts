import { Trait } from '@lifaon/traits';
import { TraitLinkedListNodeNextIterator } from './trait-linked-list-node-next-iterator';
import { TraitLinkedListNodeGetNext } from 'src/core/list/linked/traits/node/next/trait-linked-list-node-get-next/trait-linked-list-node-get-next';


export interface ITraitLinkedListNodeNextIteratorUsingGetNextGSelfConstraint<GSelf> extends
  // traits
  TraitLinkedListNodeGetNext<GSelf>
  //
{
}

@Trait()
export abstract class TraitLinkedListNodeNextIteratorUsingGetNext<GSelf extends ITraitLinkedListNodeNextIteratorUsingGetNextGSelfConstraint<GSelf>> extends TraitLinkedListNodeNextIterator<GSelf> {
  * nextIterator(this: GSelf): Iterator<GSelf> {
    let node: GSelf = this;
    do {
      yield node;
      node = node.getNext();
    } while (node !== this);
  }
}


