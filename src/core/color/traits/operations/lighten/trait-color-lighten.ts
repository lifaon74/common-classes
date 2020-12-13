import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorLighten<GSelf, GReturn> {
  abstract lighten(this: GSelf, amount: number): GReturn;
}


