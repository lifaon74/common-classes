import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeNextIterator<GSelf> {
  abstract nextIterator(this: GSelf): Iterator<GSelf>;
}


