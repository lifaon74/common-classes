import { HasProperty, IsObject, TIteratorNextFunction } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const ITERATOR_PRIVATE_CONTEXT: unique symbol = Symbol('iterator-private-context');

export interface IIteratorPrivateContext<GValue, GReturn, GNext> {
  readonly next: TIteratorNextFunction<GValue, GReturn, GNext>;
}

export type TIteratorPrivateContextFromGSelf<GSelf extends TGenericIteratorStruct> = IIteratorPrivateContext<TInferIteratorStructGValue<GSelf>,
  TInferIteratorStructGReturn<GSelf>,
  TInferIteratorStructGNext<GSelf>>;


/** STRUCT DEFINITION **/

export interface IIteratorStruct<GValue, GReturn, GNext> {
  readonly [ITERATOR_PRIVATE_CONTEXT]: IIteratorPrivateContext<GValue, GReturn, GNext>;
}

export type TGenericIteratorStruct = IIteratorStruct<any, any, any>;

export type TInferIteratorStructGValue<GIteratorStruct extends TGenericIteratorStruct> =
  GIteratorStruct extends IIteratorStruct<infer GValue, any, any>
    ? GValue
    : never;


export type TInferIteratorStructGReturn<GIteratorStruct extends TGenericIteratorStruct> =
  GIteratorStruct extends IIteratorStruct<any, infer GReturn, any>
    ? GReturn
    : never;

export type TInferIteratorStructGNext<GIteratorStruct extends TGenericIteratorStruct> =
  GIteratorStruct extends IIteratorStruct<any, any, infer GNext>
    ? GNext
    : never;

export function IsIteratorStruct<GValue, GReturn, GNext>(value: any): value is IIteratorStruct<GValue, GReturn, GNext> {
  return IsObject(value)
    && HasProperty(value, ITERATOR_PRIVATE_CONTEXT);
}

