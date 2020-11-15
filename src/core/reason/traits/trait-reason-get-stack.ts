import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitReasonGetStack<GSelf> {
  abstract getStack(this: GSelf): string;
}
