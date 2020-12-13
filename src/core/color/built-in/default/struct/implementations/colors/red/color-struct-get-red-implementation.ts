import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorGetRed } from '../../../../../../traits/colors/red/trait-color-get-red';


@Impl()
export class ImplTraitGetRedForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorGetRed<GSelf> {
  getRed(this: GSelf): number {
    return this[COLOR_PRIVATE_CONTEXT].r;
  }
}
