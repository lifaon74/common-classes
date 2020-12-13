import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorSetBlue<GSelf> {
  abstract setBlue(this: GSelf, value: number): void;
}


