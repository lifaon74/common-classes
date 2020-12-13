import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorToRGBAUsingToRGBGSelfConstraint, TraitColorToRGBAUsingToRGB
} from '../../../../../../traits/to/to-rgb/trait-color-to-rgba-using-to-rgb';


export interface IImplTraitToRGBAForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToRGBAUsingToRGBGSelfConstraint {
}

@Impl()
export class ImplTraitToRGBAForColorStruct<GSelf extends IImplTraitToRGBAForColorStructGSelfConstraint> extends TraitColorToRGBAUsingToRGB<GSelf> {
}
