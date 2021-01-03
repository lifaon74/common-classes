import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeGetNext<GSelf> {
  abstract getNext(this: GSelf): GSelf;
}


