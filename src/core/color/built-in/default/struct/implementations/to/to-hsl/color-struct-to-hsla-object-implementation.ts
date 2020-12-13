import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorToHSLAObjectUsingGetColorsGSelfConstraint, TraitColorToHSLAObjectUsingGetColors
} from '../../../../../../traits/to/to-hsl/trait-color-to-hsla-object-using-get-colors';


export interface IImplTraitToHSLAObjectForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToHSLAObjectUsingGetColorsGSelfConstraint {
}

@Impl()
export class ImplTraitToHSLAObjectForColorStruct<GSelf extends IImplTraitToHSLAObjectForColorStructGSelfConstraint> extends TraitColorToHSLAObjectUsingGetColors<GSelf> {
}
