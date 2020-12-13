import { Impl } from '@lifaon/traits';
import {
  ITraitColorParseUsingParseRGBGSelfConstraint, TraitColorParseUsingParseRGB
} from '../../../../traits/static/parse/trait-color-parse-using-parse-rgb';


export interface ITImplTraitParseForColorClassGSelfConstraint<GReturn> extends
  // traits
  ITraitColorParseUsingParseRGBGSelfConstraint<GReturn>
  //
{
}

@Impl()
export class ImplTraitParseForColorClass<GSelf extends ITImplTraitParseForColorClassGSelfConstraint<GReturn>, GReturn> extends TraitColorParseUsingParseRGB<GSelf, GReturn> {
}
