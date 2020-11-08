import { TGenericActivableStruct, } from '../activable-struct';
import {
  Impl, TraitToggleUsingActivateAndDeactivate, TTraitToggleUsingActivateAndDeactivateGSelfConstraint
} from '@lifaon/traits';


export interface TImplTraitToggleForActivableStructGSelfConstraint<GSelf extends TGenericActivableStruct> extends TGenericActivableStruct, TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForActivableStruct<GSelf extends TImplTraitToggleForActivableStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}
