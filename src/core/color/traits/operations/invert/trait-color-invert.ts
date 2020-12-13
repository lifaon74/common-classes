import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorInvert<GSelf, GReturn> {
  abstract invert(this: GSelf, amount?: number): GReturn;
}


