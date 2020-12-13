import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorDarken<GSelf, GReturn> {
  abstract darken(this: GSelf, amount: number): GReturn;
}


