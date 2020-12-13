import { ALLOC, Trait } from '@lifaon/traits';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';
import { TraitColorInvert } from './trait-color-invert';
import { TraitColorAlloc } from '../../alloc/trait-color-alloc';


export interface ITraitColorInvertUsingGetColorsAndAllocGSelfConstraint<GReturn> extends
  // traits
  ITraitGetColors<any>,
  TraitColorAlloc<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorInvertUsingGetColorsAndAlloc< // generics
  GSelf extends ITraitColorInvertUsingGetColorsAndAllocGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorInvert<GSelf, GReturn> {
  invert(this: GSelf, amount: number = 1): GReturn {
    if ((0 <= amount) && (amount <= 1)) {
      return this[ALLOC](
        amount * (1 - this.getRed()) + (1 - amount) * this.getRed(),
        amount * (1 - this.getGreen()) + (1 - amount) * this.getGreen(),
        amount * (1 - this.getBlue()) + (1 - amount) * this.getBlue(),
        this.getAlpha(),
      );
    } else {
      throw new RangeError(`Expected 'amount' in the range [0, 1]`);
    }
  }
}


