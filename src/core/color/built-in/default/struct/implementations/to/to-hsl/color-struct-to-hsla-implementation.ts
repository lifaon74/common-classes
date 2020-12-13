import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorToHSLAUsingToHSLGSelfConstraint, TraitColorToHSLAUsingToHSL
} from '../../../../../../traits/to/to-hsl/trait-color-to-hsla-using-to-hsl';


export interface IImplTraitToHSLAForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToHSLAUsingToHSLGSelfConstraint {
}

@Impl()
export class ImplTraitToHSLAForColorStruct<GSelf extends IImplTraitToHSLAForColorStructGSelfConstraint> extends TraitColorToHSLAUsingToHSL<GSelf> {
}
