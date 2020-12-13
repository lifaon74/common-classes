import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorGetGreen<GSelf> {
  abstract getGreen(this: GSelf): number;
}


