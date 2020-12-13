import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorDarkenUsingLightenGSelfConstraint, TraitColorDarkenUsingLighten
} from '../../../../../../traits/operations/darken/trait-color-darken-using-lighten';


export interface IImplTraitDarkenForColorStructGSelfConstraint<GReturn> extends TGenericColorStruct, ITraitColorDarkenUsingLightenGSelfConstraint<GReturn> {
}


@Impl()
export class ImplTraitDarkenForColorStruct< // generics
  GSelf extends IImplTraitDarkenForColorStructGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorDarkenUsingLighten<GSelf, GReturn> {
}


