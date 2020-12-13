import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitColorToHex<GSelf> {
  /**
   * Returns the css hex color.
   */
  abstract toHex(this: GSelf, alpha?: boolean): string;
}


