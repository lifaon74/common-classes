import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeGetSize<GSelf> {
  abstract getSize(this: GSelf): number;
}


