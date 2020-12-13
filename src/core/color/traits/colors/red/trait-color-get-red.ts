import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorGetRed<GSelf> {
  abstract getRed(this: GSelf): number;
}


