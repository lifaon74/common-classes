import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListGetFirst<GSelf, GNode> {
  abstract getFirst(this: GSelf): GNode | null;
}


