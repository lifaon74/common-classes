import { Trait } from '@lifaon/traits';
import { TraitColorToRGB } from './trait-color-to-rgb';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';

export interface ITraitColorToRGBUsingGetColorsGSelfConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

@Trait()
export abstract class TraitColorToRGBUsingGetColors<GSelf extends ITraitColorToRGBUsingGetColorsGSelfConstraint> extends TraitColorToRGB<GSelf> {
  toRGB(this: GSelf, alpha: boolean = false): string {
    return `rgb${ alpha ? 'a' : '' }(${ Math.round(this.getRed() * 255) }, ${ Math.round(this.getGreen() * 255) }, ${ Math.round(this.getBlue() * 255) }${ alpha ? (', ' + this.getAlpha()) : '' })`;
  }
}


