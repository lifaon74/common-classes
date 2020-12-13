import { Impl } from '@lifaon/traits';
import {
  ITraitColorFromHSLAObjectUsingAllocGSelfConstraint, TraitColorFromHSLAObjectUsingAlloc
} from '../../../../traits/static/from-hsla-object/trait-color-from-hsla-object-using-alloc';


export interface IImplTraitFromHSLAObjectForColorClassGSelfConstraint<GReturn> extends
  // traits
  ITraitColorFromHSLAObjectUsingAllocGSelfConstraint<GReturn>
  //
{
}

@Impl()
export class ImplTraitFromHSLAObjectForColorClass<GSelf extends IImplTraitFromHSLAObjectForColorClassGSelfConstraint<GReturn>, GReturn> extends TraitColorFromHSLAObjectUsingAlloc<GSelf, GReturn> {
}
