import { COLOR_PRIVATE_CONTEXT, IColorPrivateContext, IColorStruct, } from '../struct/color-struct';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitGetRedForColorStruct } from '../struct/implementations/colors/red/color-struct-get-red-implementation';
import { ImplTraitGetAlphaForColorStruct } from '../struct/implementations/colors/alpha/color-struct-get-alpha-implementation';
import { ImplTraitGetBlueForColorStruct } from '../struct/implementations/colors/blue/color-struct-get-blue-implementation';
import { ImplTraitGetGreenForColorStruct } from '../struct/implementations/colors/green/color-struct-get-green-implementation';
import { ImplTraitSetAlphaForColorStruct } from '../struct/implementations/colors/alpha/color-struct-set-alpha-implementation';
import { ImplTraitSetBlueForColorStruct } from '../struct/implementations/colors/blue/color-struct-set-blue-implementation';
import { ImplTraitSetGreenForColorStruct } from '../struct/implementations/colors/green/color-struct-set-green-implementation';
import { ImplTraitSetRedForColorStruct } from '../struct/implementations/colors/red/color-struct-set-red-implementation';
import { ImplTraitEqualsForColorStruct } from '../struct/implementations/comparison/equals/color-struct-equals-implementation';
import { ImplTraitToRGBForColorStruct } from '../struct/implementations/to/to-rgb/color-struct-to-rgb-implementation';
import { ImplTraitToRGBAForColorStruct } from '../struct/implementations/to/to-rgb/color-struct-to-rgba-implementation';
import { ImplTraitToHSLForColorStruct } from '../struct/implementations/to/to-hsl/color-struct-to-hsl-implementation';
import { ImplTraitToHSLAForColorStruct } from '../struct/implementations/to/to-hsl/color-struct-to-hsla-implementation';
import { ImplTraitToHSLAObjectForColorStruct } from '../struct/implementations/to/to-hsl/color-struct-to-hsla-object-implementation';
import { ImplTraitToStringForColorStruct } from '../struct/implementations/to/to-string/color-struct-to-string-implementation';
import { ImplTraitToHexForColorStruct } from '../struct/implementations/to/to-hex/color-struct-to-hex-implementation';
import { ImplTraitAllocForColorClass } from './implementations/color-class-alloc-implementation';
import { ImplTraitMixForColorStruct } from '../struct/implementations/operations/mix/color-struct-mix-implementation';
import { ITraitColorMixUsingGetColorsAndAllocGColorConstraint } from '../../../traits/operations/mix/trait-color-mix-using-get-colors-and-alloc';
import { ImplTraitParseRGBForColorClass } from './implementations/color-class-parse-rgb-implementation';
import { ImplTraitParseForColorClass } from './implementations/color-class-parse-implementation';
import { ImplTraitGrayscaleForColorStruct } from '../struct/implementations/operations/grayscale/color-struct-grayscale-implementation';
import { NormalizeColorValue } from '../../../functions/normalize-color-value';
import { ImplTraitFromHSLAObjectForColorClass } from './implementations/color-class-from-hsla-object-implementation';
import { ImplTraitInvertForColorStruct } from '../struct/implementations/operations/invert/color-struct-invert-implementation';
import { ImplTraitLightenForColorStruct } from '../struct/implementations/operations/lighten/color-struct-lighten-implementation';
import { ImplTraitDarkenForColorStruct } from '../struct/implementations/operations/darken/color-struct-lighten-implementation';

/** CONSTRUCTOR **/

export function ConstructColor(
  instance: IColorStruct,
  r: number,
  g: number,
  b: number,
  a: number,
): void {
  // INFO private properties are ~3 times slower to assign
  CreatePrivateContext<IColorPrivateContext>(
    COLOR_PRIVATE_CONTEXT,
    instance,
    {
      r: NormalizeColorValue(r, 'r'),
      g: NormalizeColorValue(g, 'g'),
      b: NormalizeColorValue(b, 'b'),
      a: NormalizeColorValue(a, 'a'),
    },
  );
}


/** CLASS **/

// FOR PROTOTYPE

export interface IColorImplementations extends
  // implementations

  // alloc
  ImplTraitAllocForColorClass<IColor>,

  // colors
  // r
  ImplTraitGetRedForColorStruct<IColor>,
  ImplTraitSetRedForColorStruct<IColor>,
  // g
  ImplTraitGetGreenForColorStruct<IColor>,
  ImplTraitSetGreenForColorStruct<IColor>,
  // b
  ImplTraitGetBlueForColorStruct<IColor>,
  ImplTraitSetBlueForColorStruct<IColor>,
  // a
  ImplTraitGetAlphaForColorStruct<IColor>,
  ImplTraitSetAlphaForColorStruct<IColor>,

  // comparison
  ImplTraitEqualsForColorStruct<IColor>,

  // operations
  ImplTraitMixForColorStruct<IColor, ITraitColorMixUsingGetColorsAndAllocGColorConstraint, IColor>,
  ImplTraitGrayscaleForColorStruct<IColor, IColor>,
  ImplTraitInvertForColorStruct<IColor, IColor>,
  ImplTraitLightenForColorStruct<IColor, IColor>,
  ImplTraitDarkenForColorStruct<IColor, IColor>,

  // to
  // rgb
  ImplTraitToRGBForColorStruct<IColor>,
  ImplTraitToRGBAForColorStruct<IColor>,
  // hsl
  ImplTraitToHSLForColorStruct<IColor>,
  ImplTraitToHSLAForColorStruct<IColor>,
  ImplTraitToHSLAObjectForColorStruct<IColor>,
  // to - others
  ImplTraitToHexForColorStruct<IColor>,
  ImplTraitToStringForColorStruct<IColor>
  //
{
}

export const ColorImplementations = [
  // alloc
  ImplTraitAllocForColorClass,
  // colors
  // r
  ImplTraitGetRedForColorStruct,
  ImplTraitSetRedForColorStruct,
  // g
  ImplTraitGetGreenForColorStruct,
  ImplTraitSetGreenForColorStruct,
  // b
  ImplTraitGetBlueForColorStruct,
  ImplTraitSetBlueForColorStruct,
  // a
  ImplTraitGetAlphaForColorStruct,
  ImplTraitSetAlphaForColorStruct,

  // comparison
  ImplTraitEqualsForColorStruct,

  // operations
  ImplTraitMixForColorStruct,
  ImplTraitGrayscaleForColorStruct,
  ImplTraitInvertForColorStruct,
  ImplTraitLightenForColorStruct,
  ImplTraitDarkenForColorStruct,

  // to
  // rgb
  ImplTraitToRGBForColorStruct,
  ImplTraitToRGBAForColorStruct,
  // hsl
  ImplTraitToHSLForColorStruct,
  ImplTraitToHSLAForColorStruct,
  ImplTraitToHSLAObjectForColorStruct,
  // to - others
  ImplTraitToHexForColorStruct,
  ImplTraitToStringForColorStruct,
];

// FOR CONSTRUCTOR

export interface IColorConstructorImplementations extends
  // implementations

  // alloc
  ImplTraitAllocForColorClass<IColor>,

  // parse
  ImplTraitParseRGBForColorClass<IColorConstructor, IColor>,
  ImplTraitParseForColorClass<IColorConstructor, IColor>,

  // from
  ImplTraitFromHSLAObjectForColorClass<IColorConstructor, IColor>

  //
{
}

export const ColorConstructorImplementations = [
  // alloc
  ImplTraitAllocForColorClass,
  // parse
  ImplTraitParseRGBForColorClass,
  ImplTraitParseForColorClass,
  // from
  ImplTraitFromHSLAObjectForColorClass,
];

export interface IHavingConstructorWithColorConstructorImplementations {
  constructor: IColorConstructorImplementations;
}

export interface IColorImplementationsHavingColorConstructor extends IColorImplementations, IHavingConstructorWithColorConstructorImplementations {

}

export interface IColorImplementationsConstructor extends IColorConstructorImplementations {
  new(): IColorImplementationsHavingColorConstructor;
}

export interface IColor extends IColorStruct, IColorImplementationsHavingColorConstructor {
  r: number;
  g: number;
  b: number;
  a: number;
}


export interface IColorConstructor extends IColorConstructorImplementations {
  new(
    r: number,
    g: number,
    b: number,
    a: number,
  ): IColor;
}


const ColorImplementationsConstructor = AssembleTraitImplementations<IColorImplementationsConstructor>(ColorImplementations, ColorConstructorImplementations);

export class Color extends ColorImplementationsConstructor implements IColor {
  readonly [COLOR_PRIVATE_CONTEXT]: IColorPrivateContext;

  constructor(
    r: number,
    g: number,
    b: number,
    a: number,
  ) {
    super();
    ConstructColor(this, r, g, b, a);
  }

  get r(): number {
    return this.getRed();
  }

  set r(value: number) {
    this.setRed(value);
  }

  get g(): number {
    return this.getGreen();
  }

  set g(value: number) {
    this.setGreen(value);
  }

  get b(): number {
    return this.getBlue();
  }

  set b(value: number) {
    this.setBlue(value);
  }

  get a(): number {
    return this.getAlpha();
  }

  set a(value: number) {
    this.setAlpha(value);
  }
}
