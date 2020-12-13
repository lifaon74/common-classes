import { Impl } from '@lifaon/traits';
import {
  ITraitColorParseRGBUsingAllocGSelfConstraint, TraitColorParseRGBUsingAlloc
} from '../../../../traits/static/parse/trait-color-parse-rgb-using-alloc';


export interface IImplTraitParseRGBForColorClassGSelfConstraint<GReturn> extends
  // traits
  ITraitColorParseRGBUsingAllocGSelfConstraint<GReturn>
  //
{
}

@Impl()
export class ImplTraitParseRGBForColorClass<GSelf extends IImplTraitParseRGBForColorClassGSelfConstraint<GReturn>, GReturn> extends TraitColorParseRGBUsingAlloc<GSelf, GReturn> {
}
