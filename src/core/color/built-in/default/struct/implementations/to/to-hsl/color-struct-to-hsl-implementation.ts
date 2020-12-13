import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorToHSLUsingToHSLAObjectGSelfConstraint, TraitColorToHSLUsingToHSLAObject
} from '../../../../../../traits/to/to-hsl/trait-color-to-hsl-using-to-hsla-object';

export interface IImplTraitToHSLForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToHSLUsingToHSLAObjectGSelfConstraint {
}

@Impl()
export class ImplTraitToHSLForColorStruct<GSelf extends IImplTraitToHSLForColorStructGSelfConstraint> extends TraitColorToHSLUsingToHSLAObject<GSelf> {
}
