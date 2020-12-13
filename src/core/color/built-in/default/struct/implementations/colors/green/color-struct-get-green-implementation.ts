import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorGetGreen } from '../../../../../../traits/colors/green/trait-color-get-green';


@Impl()
export class ImplTraitGetGreenForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorGetGreen<GSelf> {
  getGreen(this: GSelf): number {
    return this[COLOR_PRIVATE_CONTEXT].g;
  }
}
