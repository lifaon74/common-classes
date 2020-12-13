import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorGetAlpha<GSelf> {
  abstract getAlpha(this: GSelf): number;
}


