import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitDoublyLinkedListNodeSetPrevious<GSelf> {
  abstract setPrevious(this: GSelf, node: GSelf): void;
}


