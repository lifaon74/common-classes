import { TCode } from '../reason-types';

/** PRIVATE CONTEXT **/

export const REASON_PRIVATE_CONTEXT: unique symbol = Symbol('reason-private-context');

export interface IReasonPrivateContext<GCode extends TCode> {
  readonly message: string;
  readonly code: GCode;
  readonly stack: string;
}

/** STRUCT DEFINITION **/

export interface IReasonStruct<GCode extends TCode> {
  readonly [REASON_PRIVATE_CONTEXT]: IReasonPrivateContext<GCode>;
}

export type TGenericReasonStruct = IReasonStruct<any>;
