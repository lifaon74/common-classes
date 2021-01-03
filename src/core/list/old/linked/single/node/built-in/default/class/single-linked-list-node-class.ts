import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitGetNextForSingleLinkedListNodeStruct } from '../struct/implementations/single-linked-list-node-struct-get-next-implementation';
import {
  ISingleLinkedListNodePrivateContext, ISingleLinkedListNodeStruct, SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT
} from '../struct/single-linked-list-node-struct';
import { ImplTraitSetNextForSingleLinkedListNodeStruct } from '../struct/implementations/single-linked-list-node-struct-set-next-implementation';

/** CONSTRUCTOR **/

export function ConstructSingleLinkedListNode(
  instance: ISingleLinkedListNodeStruct,
): void {
  CreatePrivateContext<ISingleLinkedListNodePrivateContext>(
    SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT,
    instance,
    {
      next: instance,
    },
  );
}


/** CLASS **/

// FOR PROTOTYPE

export interface ISingleLinkedListNodeImplementations extends
  // implementations

  ImplTraitGetNextForSingleLinkedListNodeStruct<ISingleLinkedListNode>,
  ImplTraitSetNextForSingleLinkedListNodeStruct<ISingleLinkedListNode>
  //
{
}

export const SingleLinkedListNodeImplementations = [
  ImplTraitGetNextForSingleLinkedListNodeStruct,
  ImplTraitSetNextForSingleLinkedListNodeStruct,
];

export interface ISingleLinkedListNodeImplementationsConstructor {
  new(): ISingleLinkedListNode;
}

export interface ISingleLinkedListNode extends ISingleLinkedListNodeStruct, ISingleLinkedListNodeImplementations {
}


const SingleLinkedListNodeImplementationsConstructor = AssembleTraitImplementations<ISingleLinkedListNodeImplementationsConstructor>(SingleLinkedListNodeImplementations);

export class SingleLinkedListNode extends SingleLinkedListNodeImplementationsConstructor implements ISingleLinkedListNode {
  readonly [SINGLE_LINKED_LIST_NODE_PRIVATE_CONTEXT]: ISingleLinkedListNodePrivateContext;

  constructor() {
    super();
    ConstructSingleLinkedListNode(this);
  }

}
