import { TraitReasonGetMessage } from './traits/trait-reason-get-message';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { TInferTraitReasonGetCodeGCode, TraitReasonGetCode } from './traits/trait-reason-get-code';
import { TraitReasonGetStack } from './traits/trait-reason-get-stack';

export interface IReasonLike<GCode> extends TraitReasonGetCode<any, GCode>,
  TraitReasonGetMessage<any>,
  TraitReasonGetStack<any> {
}

export type TGenericReasonLike = IReasonLike<any>;

export type TInferReasonLikeGCode<GReasonLike extends TGenericReasonLike> = TInferTraitReasonGetCodeGCode<GReasonLike>;

export function IsReasonLike<GCode>(value: any): value is IReasonLike<GCode> {
  return TraitIsImplementedBy(TraitReasonGetCode, value)
    && TraitIsImplementedBy(TraitReasonGetMessage, value)
    && TraitIsImplementedBy(TraitReasonGetStack, value);
}


/** TYPES **/

export type IReasonOptions<GCode> =
  IReasonOptionsWithoutCode
  | IReasonOptionsWithCode<GCode>;


export interface IReasonOptionsWithoutCode {
  message: string;
  stack?: string;
}

export interface IReasonOptionsWithCode<GCode> extends IReasonOptionsWithoutCode {
  code: GCode;
}

