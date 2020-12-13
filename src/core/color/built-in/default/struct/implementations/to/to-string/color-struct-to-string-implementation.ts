import { Impl } from '@lifaon/traits';
import { TGenericColorStruct } from '../../../color-struct';
import {
  ITraitColorToStringUsingToRGBGSelfConstraint, TraitColorToStringUsingToRGB
} from '../../../../../../traits/to/to-string/trait-color-to-string-using-to-rgb';

export interface IImplTraitToStringForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToStringUsingToRGBGSelfConstraint {
}

@Impl()
export class ImplTraitToStringForColorStruct<GSelf extends IImplTraitToStringForColorStructGSelfConstraint> extends TraitColorToStringUsingToRGB<GSelf> {
}
