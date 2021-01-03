import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitLinkedListNodeSetValue<GSelf, GValue> {
  abstract setValue(this: GSelf, value: GValue): void;
}


