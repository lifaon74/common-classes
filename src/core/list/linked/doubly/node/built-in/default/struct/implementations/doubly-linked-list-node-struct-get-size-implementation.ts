import { Impl } from '@lifaon/traits';
import { IDoublyLinkedListNodeStruct } from '../doubly-linked-list-node-struct';
import {
  ITraitLinkedListNodeGetSizeUsingGetNextGSelfConstraint, TraitLinkedListNodeGetSizeUsingGetNext
} from '../../../../../../traits/node/trait-linked-list-node-get-size/trait-linked-list-node-get-size-using-get-next';


export interface IImplTraitGetSizeForDoublyLinkedListNodeStructGSelfConstraint<GSelf extends IImplTraitGetSizeForDoublyLinkedListNodeStructGSelfConstraint<GSelf>> extends IDoublyLinkedListNodeStruct<GSelf, any>,
  ITraitLinkedListNodeGetSizeUsingGetNextGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitGetSizeForDoublyLinkedListNodeStruct<GSelf extends IImplTraitGetSizeForDoublyLinkedListNodeStructGSelfConstraint<GSelf>> extends TraitLinkedListNodeGetSizeUsingGetNext<GSelf> {
}

