import { ALLOC, Impl } from '@lifaon/traits';
import { TraitColorAlloc } from '../../../../traits/alloc/trait-color-alloc';
import { Color, IColor } from '../color-class';


@Impl()
export class ImplTraitAllocForColorClass<GSelf> extends TraitColorAlloc<GSelf, IColor> {
  [ALLOC](this: GSelf, r: number, g: number, b: number, a: number): IColor {
    return new Color(r, g, b, a);
  }
}
