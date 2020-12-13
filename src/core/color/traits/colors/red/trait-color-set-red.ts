import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorSetRed<GSelf> {
  abstract setRed(this: GSelf, value: number): void;
}


