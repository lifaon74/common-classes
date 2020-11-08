import {
  Impl, TraitToggleUsingActivateAndDeactivate, TTraitToggleUsingActivateAndDeactivateGSelfConstraint
} from '@lifaon/traits';
import { TGenericPipeStruct } from '../pipe-struct';

export interface ImplTraitToggleForPipeStructGSelfConstraint<GSelf extends TGenericPipeStruct> extends TGenericPipeStruct, TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForPipeStruct<GSelf extends ImplTraitToggleForPipeStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}

