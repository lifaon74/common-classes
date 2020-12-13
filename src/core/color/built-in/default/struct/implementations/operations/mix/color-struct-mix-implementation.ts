import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorMixUsingGetColorsAndAllocGColorConstraint, ITraitColorMixUsingGetColorsAndAllocGSelfConstraint,
  TraitColorMixUsingGetColorsAndAlloc
} from '../../../../../../traits/operations/mix/trait-color-mix-using-get-colors-and-alloc';


export interface IImplTraitMixForColorStructGSelfConstraint<GReturn> extends TGenericColorStruct, ITraitColorMixUsingGetColorsAndAllocGSelfConstraint<GReturn> {
}


@Impl()
export class ImplTraitMixForColorStruct< // generics
  GSelf extends IImplTraitMixForColorStructGSelfConstraint<GReturn>,
  GColor extends ITraitColorMixUsingGetColorsAndAllocGColorConstraint,
  GReturn
  //
  > extends TraitColorMixUsingGetColorsAndAlloc<GSelf, GColor, GReturn> {
}


