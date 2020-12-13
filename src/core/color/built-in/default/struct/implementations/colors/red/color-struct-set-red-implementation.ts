import { COLOR_PRIVATE_CONTEXT, TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import { TraitColorSetRed } from '../../../../../../traits/colors/red/trait-color-set-red';
import { NormalizeColorValue } from '../../../../../../functions/normalize-color-value';


@Impl()
export class ImplTraitSetRedForColorStruct<GSelf extends TGenericColorStruct> extends TraitColorSetRed<GSelf> {
  setRed(this: GSelf, value: number): void {
    this[COLOR_PRIVATE_CONTEXT].r = NormalizeColorValue(value, 'r');
  }
}
