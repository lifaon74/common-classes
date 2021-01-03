import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitDoublyLinkedListNodeGetPrevious<GSelf> {
  abstract getPrevious(this: GSelf): GSelf;
}


