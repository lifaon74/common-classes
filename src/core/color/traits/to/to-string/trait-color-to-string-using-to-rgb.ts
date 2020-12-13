import { Trait } from '@lifaon/traits';
import { TraitColorToString } from './trait-color-to-string';
import { TraitColorToRGB } from '../to-rgb/trait-color-to-rgb';

export interface ITraitColorToStringUsingToRGBGSelfConstraint extends
  // traits
  TraitColorToRGB<any>
  //
{
}

@Trait()
export abstract class TraitColorToStringUsingToRGB<GSelf extends ITraitColorToStringUsingToRGBGSelfConstraint> extends TraitColorToString<GSelf> {
  toString(this: GSelf): string {
    return this.toRGB(true);
  }
}


