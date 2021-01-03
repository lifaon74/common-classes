import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitSingleLinkedListNodeGetNext<GSelf> {
  abstract getNext(this: GSelf): GSelf;
}


