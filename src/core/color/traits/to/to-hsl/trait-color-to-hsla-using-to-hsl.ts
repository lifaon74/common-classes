import { Trait } from '@lifaon/traits';
import { TraitColorToHSL } from './trait-color-to-hsl';

export interface ITraitColorToHSLAUsingToHSLGSelfConstraint extends
  // traits
  TraitColorToHSL<any>
  //
{
}

@Trait()
export abstract class TraitColorToHSLAUsingToHSL<GSelf extends ITraitColorToHSLAUsingToHSLGSelfConstraint> {
  toHSLA(this: GSelf): string {
    return this.toHSL(true);
  }
}


