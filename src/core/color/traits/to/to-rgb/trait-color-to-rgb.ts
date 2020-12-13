import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorToRGB<GSelf> {
  /**
   * Returns the css rgb or rgba color.
   */
  abstract toRGB(this: GSelf, alpha?: boolean): string;
}


