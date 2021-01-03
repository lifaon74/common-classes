import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeSetNext<GSelf> {
  abstract setNext(this: GSelf, node: GSelf): void;
}


