import { ALLOC, Trait } from '@lifaon/traits';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';
import { TraitColorMix } from './trait-color-mix';
import { TraitColorAlloc } from '../../alloc/trait-color-alloc';


export interface ITraitColorMixUsingGetColorsAndAllocGSelfConstraint<GReturn> extends
  // traits
  ITraitGetColors<any>,
  TraitColorAlloc<any, GReturn>
  //
{
}

export interface ITraitColorMixUsingGetColorsAndAllocGColorConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

@Trait()
export abstract class TraitColorMixUsingGetColorsAndAlloc< // generics
  GSelf extends ITraitColorMixUsingGetColorsAndAllocGSelfConstraint<GReturn>,
  GColor extends ITraitColorMixUsingGetColorsAndAllocGColorConstraint,
  GReturn
  //
  > extends TraitColorMix<GSelf, GColor, GReturn> {
  mix(this: GSelf, color: GColor, proportion: number): GReturn {
    if ((0 <= proportion) && (proportion <= 1)) {
      const _proportion: number = 1 - proportion;
      return this[ALLOC](
        ((this.getRed() * _proportion) + (color.getRed() * proportion)),
        ((this.getGreen() * _proportion) + (color.getGreen() * proportion)),
        ((this.getBlue() * _proportion) + (color.getBlue() * proportion)),
        ((this.getAlpha() * _proportion) + (color.getAlpha() * proportion)),
      );
    } else {
      throw new RangeError(`Expected 'proportion' in the range [0, 1]`);
    }
  }
}


