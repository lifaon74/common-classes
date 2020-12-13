import { Trait } from '@lifaon/traits';
import { TraitColorToRGB } from './trait-color-to-rgb';

export interface ITraitColorToRGBAUsingToRGBGSelfConstraint extends
  // traits
  TraitColorToRGB<any>
  //
{
}

@Trait()
export abstract class TraitColorToRGBAUsingToRGB<GSelf extends ITraitColorToRGBAUsingToRGBGSelfConstraint> {
  toRGBA(this: GSelf): string {
    return this.toRGB(true);
  }
}


