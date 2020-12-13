import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitProgressGetLoaded<GSelf> {
  abstract getLoaded(this: GSelf): number;
}


