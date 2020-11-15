import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const REASON_PRIVATE_CONTEXT: unique symbol = Symbol('reason-private-context');

export interface IReasonPrivateContext<GCode> {
  readonly message: string;
  readonly code: GCode;
  readonly stack: string;
}

export type TReasonPrivateContextFromGSelf<GSelf extends TGenericReasonStruct> = IReasonPrivateContext<TInferReasonStructGCode<GSelf>>;


/** STRUCT DEFINITION **/

export interface IReasonStruct<GCode> {
  readonly [REASON_PRIVATE_CONTEXT]: IReasonPrivateContext<GCode>;
}

export type TGenericReasonStruct = IReasonStruct<any>;

export type TInferReasonStructGCode<GReasonStruct extends TGenericReasonStruct> =
  GReasonStruct extends IReasonStruct<infer GCode>
    ? GCode
    : never;


export function IsReasonStruct<GCode>(value: any): value is IReasonStruct<GCode> {
  return IsObject(value)
    && HasProperty(value, REASON_PRIVATE_CONTEXT);
}
