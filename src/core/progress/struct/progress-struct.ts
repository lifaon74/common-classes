import { TCode } from '../../reason/reason-types';

/** PRIVATE CONTEXT **/

export const PROGRESS_PRIVATE_CONTEXT: unique symbol = Symbol('progress-private-context');

export interface IProgressPrivateContext<GCode extends TCode> {
  loaded: number;
  total: number;
  code: GCode;
}


/** STRUCT DEFINITION **/

export interface IProgressStruct<GCode extends TCode> {
  readonly [PROGRESS_PRIVATE_CONTEXT]: IProgressPrivateContext<GCode>;
}

export type TGenericProgressStruct = IProgressStruct<TCode>;
