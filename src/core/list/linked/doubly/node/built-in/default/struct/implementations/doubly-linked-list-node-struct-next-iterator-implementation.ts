import { Impl } from '@lifaon/traits';
import { IDoublyLinkedListNodeStruct } from '../doubly-linked-list-node-struct';
import {
  ITraitLinkedListNodeNextIteratorUsingGetNextGSelfConstraint, TraitLinkedListNodeNextIteratorUsingGetNext
} from '../../../../../../traits/node/iterators/trait-linked-list-node-next-iterator/trait-linked-list-node-next-iterator-using-get-next';


export interface IImplTraitNextIteratorForDoublyLinkedListNodeStructGSelfConstraint<GSelf extends IImplTraitNextIteratorForDoublyLinkedListNodeStructGSelfConstraint<GSelf>> extends IDoublyLinkedListNodeStruct<GSelf, any>,
  ITraitLinkedListNodeNextIteratorUsingGetNextGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitNextIteratorForDoublyLinkedListNodeStruct<GSelf extends IImplTraitNextIteratorForDoublyLinkedListNodeStructGSelfConstraint<GSelf>> extends TraitLinkedListNodeNextIteratorUsingGetNext<GSelf> {
}

