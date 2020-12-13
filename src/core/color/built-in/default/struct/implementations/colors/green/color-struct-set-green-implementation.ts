import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorSetGreen } from '../../../../../../traits/colors/green/trait-color-set-green';
import { NormalizeColorValue } from '../../../../../../functions/normalize-color-value';


@Impl()
export class ImplTraitSetGreenForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorSetGreen<GSelf> {
  setGreen(this: GSelf, value: number): void {
    this[COLOR_PRIVATE_CONTEXT].g = NormalizeColorValue(value, 'g');
  }
}
