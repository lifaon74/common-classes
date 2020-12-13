import { Trait } from '@lifaon/traits';
import { TraitColorToHex } from './trait-color-to-hex';
import { NumberToHex } from '../../../functions/number-to-hex';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';

export interface ITraitColorToHexUsingGetColorsGSelfConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

@Trait()
export abstract class TraitColorToHexUsingGetColors<GSelf extends ITraitColorToHexUsingGetColorsGSelfConstraint> extends TraitColorToHex<GSelf> {
  toHex(this: GSelf, alpha: boolean = false): string {
    return `#${ NumberToHex(Math.round(this.getRed() * 255), 2) }${ NumberToHex(Math.round(this.getGreen() * 255), 2) }${ NumberToHex(Math.round(this.getBlue() * 255), 2) }${ (alpha ? NumberToHex(Math.round(this.getAlpha() * 255), 2) : '') }`;
  }
}


