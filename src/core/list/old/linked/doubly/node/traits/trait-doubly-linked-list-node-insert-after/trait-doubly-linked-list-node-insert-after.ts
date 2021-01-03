import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitDoublyLinkedListNodeInsertAfter<GSelf> {
  abstract insertAfter(this: GSelf, node: GSelf): void;
}


