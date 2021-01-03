import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeGetPrevious<GSelf> {
  abstract getPrevious(this: GSelf): GSelf;
}


