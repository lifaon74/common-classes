import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorToRGBUsingGetColorsGSelfConstraint, TraitColorToRGBUsingGetColors
} from '../../../../../../traits/to/to-rgb/trait-color-to-rgb-using-get-colors';

export interface IImplTraitToRGBForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToRGBUsingGetColorsGSelfConstraint {
}

@Impl()
export class ImplTraitToRGBForColorStruct<GSelf extends IImplTraitToRGBForColorStructGSelfConstraint> extends TraitColorToRGBUsingGetColors<GSelf> {
}
