import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorGetBlue } from '../../../../../../traits/colors/blue/trait-color-get-blue';


@Impl()
export class ImplTraitGetBlueForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorGetBlue<GSelf> {
  getBlue(this: GSelf): number {
    return this[COLOR_PRIVATE_CONTEXT].b;
  }
}
