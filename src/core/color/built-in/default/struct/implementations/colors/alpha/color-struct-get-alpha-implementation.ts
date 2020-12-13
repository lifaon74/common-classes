import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorGetAlpha } from '../../../../../../traits/colors/alpha/trait-color-get-alpha';


@Impl()
export class ImplTraitGetAlphaForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorGetAlpha<GSelf> {
  getAlpha(this: GSelf): number {
    return this[COLOR_PRIVATE_CONTEXT].a;
  }
}
