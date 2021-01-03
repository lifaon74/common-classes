import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListSetFirst<GSelf, GNode> {
  abstract setFirst(this: GSelf, node: GNode | null): void;
}


