import { Trait } from '@lifaon/traits';
import { TraitLinkedListNodeGetNext } from 'src/core/list/linked/traits/node/next/trait-linked-list-node-get-next/trait-linked-list-node-get-next';
import { TraitLinkedListNodeGetSize } from './trait-linked-list-node-get-size';


export interface ITraitLinkedListNodeGetSizeUsingGetNextGSelfConstraint<GSelf> extends
  // traits
  TraitLinkedListNodeGetNext<GSelf>
  //
{
}

@Trait()
export abstract class TraitLinkedListNodeGetSizeUsingGetNext<GSelf extends ITraitLinkedListNodeGetSizeUsingGetNextGSelfConstraint<GSelf>> extends TraitLinkedListNodeGetSize<GSelf> {
  getSize(this: GSelf): number {
    let size: number = 0;
    let node: GSelf = this;
    do {
      size++;
      node = node.getNext();
    } while (node !== this);
    return size;
  }
}


