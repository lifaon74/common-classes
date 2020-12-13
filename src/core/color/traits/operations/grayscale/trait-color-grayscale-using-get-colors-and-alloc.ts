import { ALLOC, Trait } from '@lifaon/traits';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';
import { TGrayScaleMode, TraitColorGrayscale } from './trait-color-grayscale';
import { TraitColorAlloc } from '../../alloc/trait-color-alloc';


export interface ITraitColorGrayscaleUsingGetColorsAndAllocGSelfConstraint<GReturn> extends
  // traits
  ITraitGetColors<any>,
  TraitColorAlloc<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorGrayscaleUsingGetColorsAndAlloc< // generics
  GSelf extends ITraitColorGrayscaleUsingGetColorsAndAllocGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorGrayscale<GSelf, GReturn> {
  grayscale(this: GSelf, mode: TGrayScaleMode = 'luminosity'): GReturn {
    let c: number;
    switch (mode) {
      case 'average':
        c = (this.getRed() + this.getGreen() + this.getBlue()) / 3;
        break;
      case 'lightness':
        c = (Math.max(this.getRed(), this.getGreen(), this.getBlue()) + Math.min(this.getRed(), this.getGreen(), this.getBlue())) / 2;
        break;
      case 'luminosity':
        c = 0.21 * this.getRed() + 0.72 * this.getGreen() + 0.07 * this.getBlue();
        break;
      default:
        throw new TypeError(`Unexpected grayscale's mode: '${ mode }'`);
    }
    return this[ALLOC](c, c, c, this.getAlpha());
  }
}


