import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorSetAlpha } from '../../../../../../traits/colors/alpha/trait-color-set-alpha';
import { NormalizeColorValue } from '../../../../../../functions/normalize-color-value';


@Impl()
export class ImplTraitSetAlphaForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorSetAlpha<GSelf> {
  setAlpha(this: GSelf, value: number): void {
    this[COLOR_PRIVATE_CONTEXT].a = NormalizeColorValue(value, 'a');
  }
}
