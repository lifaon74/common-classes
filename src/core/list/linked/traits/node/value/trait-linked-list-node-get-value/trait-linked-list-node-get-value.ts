import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeGetValue<GSelf, GValue> {
  abstract getValue(this: GSelf): GValue;
}


