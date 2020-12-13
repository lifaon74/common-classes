import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorSetGreen<GSelf> {
  abstract setGreen(this: GSelf, value: number): void;
}


