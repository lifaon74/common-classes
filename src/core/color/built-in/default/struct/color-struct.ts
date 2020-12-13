/** PRIVATE CONTEXT **/

export const COLOR_PRIVATE_CONTEXT: unique symbol = Symbol('color-private-context');

export interface IColorPrivateContext {
  r: number;
  g: number;
  b: number;
  a: number;
}


/** STRUCT DEFINITION **/

export interface IColorStruct {
  readonly [COLOR_PRIVATE_CONTEXT]: IColorPrivateContext;
}

export type TGenericColorStruct = IColorStruct;
