import { TGenericPipeThroughStruct } from '../pipe-through-struct';
import {
  Impl, TraitToggleUsingActivateAndDeactivate, TTraitToggleUsingActivateAndDeactivateGSelfConstraint
} from '@lifaon/traits';


export interface ImplTraitToggleForPipeThroughStructGSelfConstraint<GSelf extends TGenericPipeThroughStruct> extends
  //
  TGenericPipeThroughStruct,
  TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForPipeThroughStruct<GSelf extends ImplTraitToggleForPipeThroughStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}
