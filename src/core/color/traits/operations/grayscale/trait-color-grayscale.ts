import { Trait } from '@lifaon/traits';

export type TGrayScaleMode =
  'lightness'
  | 'average'
  | 'luminosity'; // (default)

@Trait()
export abstract class TraitColorGrayscale<GSelf, GReturn> {
  abstract grayscale(this: GSelf, mode?: TGrayScaleMode): GReturn;
}


