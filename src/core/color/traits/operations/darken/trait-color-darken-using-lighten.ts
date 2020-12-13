import { Trait } from '@lifaon/traits';
import { TraitColorDarken } from './trait-color-darken';
import { TraitColorLighten } from '../lighten/trait-color-lighten';


export interface ITraitColorDarkenUsingLightenGSelfConstraint<GReturn> extends
  // traits
  TraitColorLighten<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorDarkenUsingLighten< // generics
  GSelf extends ITraitColorDarkenUsingLightenGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorDarken<GSelf, GReturn> {
  darken(this: GSelf, amount: number): GReturn {
    return this.lighten(-amount);
  }
}


