import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitProgressGetTotal<GSelf> {
  abstract getTotal(this: GSelf): number;
}


