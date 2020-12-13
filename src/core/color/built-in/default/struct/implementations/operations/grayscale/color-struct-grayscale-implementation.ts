import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorGrayscaleUsingGetColorsAndAllocGSelfConstraint, TraitColorGrayscaleUsingGetColorsAndAlloc
} from '../../../../../../traits/operations/grayscale/trait-color-grayscale-using-get-colors-and-alloc';


export interface IImplTraitGrayscaleForColorStructGSelfConstraint<GReturn> extends TGenericColorStruct, ITraitColorGrayscaleUsingGetColorsAndAllocGSelfConstraint<GReturn> {
}


@Impl()
export class ImplTraitGrayscaleForColorStruct< // generics
  GSelf extends IImplTraitGrayscaleForColorStructGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorGrayscaleUsingGetColorsAndAlloc<GSelf, GReturn> {
}


