import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorLightenUsingToAndFromHSLAObjectGSelfConstraint, TraitColorLightenUsingToAndFromHSLAObject
} from '../../../../../../traits/operations/lighten/trait-color-lighten-using-to-and-from-hsla-object';


export interface IImplTraitLightenForColorStructGSelfConstraint<GReturn> extends TGenericColorStruct, ITraitColorLightenUsingToAndFromHSLAObjectGSelfConstraint<GReturn> {
}


@Impl()
export class ImplTraitLightenForColorStruct< // generics
  GSelf extends IImplTraitLightenForColorStructGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorLightenUsingToAndFromHSLAObject<GSelf, GReturn> {
}


