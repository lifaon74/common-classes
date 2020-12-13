import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorSetBlue } from '../../../../../../traits/colors/blue/trait-color-set-blue';
import { NormalizeColorValue } from '../../../../../../functions/normalize-color-value';


@Impl()
export class ImplTraitSetBlueForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorSetBlue<GSelf> {
  setBlue(this: GSelf, value: number): void {
    this[COLOR_PRIVATE_CONTEXT].b = NormalizeColorValue(value, 'b');
  }
}
