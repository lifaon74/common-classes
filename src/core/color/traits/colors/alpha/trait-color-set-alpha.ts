import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorSetAlpha<GSelf> {
  abstract setAlpha(this: GSelf, value: number): void;
}


