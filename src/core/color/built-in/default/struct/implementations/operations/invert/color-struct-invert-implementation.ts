import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorInvertUsingGetColorsAndAllocGSelfConstraint, TraitColorInvertUsingGetColorsAndAlloc
} from '../../../../../../traits/operations/invert/trait-color-invert-using-get-colors-and-alloc';


export interface IImplTraitInvertForColorStructGSelfConstraint<GReturn> extends TGenericColorStruct, ITraitColorInvertUsingGetColorsAndAllocGSelfConstraint<GReturn> {
}


@Impl()
export class ImplTraitInvertForColorStruct< // generics
  GSelf extends IImplTraitInvertForColorStructGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorInvertUsingGetColorsAndAlloc<GSelf, GReturn> {
}


