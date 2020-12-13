import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorGetBlue<GSelf> {
  abstract getBlue(this: GSelf): number;
}


