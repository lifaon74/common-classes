import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitDoublyLinkedListNodeDetach<GSelf> {
  abstract detach(this: GSelf): void;
}


