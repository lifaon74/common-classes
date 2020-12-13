import { Trait } from '@lifaon/traits';
import { TraitColorEquals } from './trait-color-equals';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';

export interface ITraitColorEqualsUsingGetColorsGSelfConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

export interface ITraitColorEqualsUsingGetColorsGValueConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

@Trait()
export abstract class TraitColorEqualsUsingGetColors<GSelf extends ITraitColorEqualsUsingGetColorsGSelfConstraint> extends TraitColorEquals<GSelf, ITraitColorEqualsUsingGetColorsGValueConstraint> {
  equals(this: GSelf, color: ITraitColorEqualsUsingGetColorsGValueConstraint): boolean {
    return (this.getRed() === color.getRed())
      && (this.getGreen() === color.getGreen())
      && (this.getBlue() === color.getBlue())
      && (this.getAlpha() === color.getAlpha());
  }
}


