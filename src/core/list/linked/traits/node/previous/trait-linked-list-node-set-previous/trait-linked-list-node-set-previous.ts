import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeSetPrevious<GSelf> {
  abstract setPrevious(this: GSelf, node: GSelf): void;
}


