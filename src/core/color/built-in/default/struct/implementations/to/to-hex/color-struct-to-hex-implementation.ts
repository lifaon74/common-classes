import { Impl } from '@lifaon/traits';
import { TGenericColorStruct } from '../../../color-struct';
import {
  ITraitColorToHexUsingGetColorsGSelfConstraint, TraitColorToHexUsingGetColors
} from '../../../../../../traits/to/to-hex/trait-color-to-hex-using-get-colors';

export interface IImplTraitToHexForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorToHexUsingGetColorsGSelfConstraint {
}

@Impl()
export class ImplTraitToHexForColorStruct<GSelf extends IImplTraitToHexForColorStructGSelfConstraint> extends TraitColorToHexUsingGetColors<GSelf> {
}
