import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitSingleLinkedListNodeSetNext<GSelf> {
  abstract setNext(this: GSelf, node: GSelf): void;
}


