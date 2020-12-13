import { TraitReasonGetMessage } from './traits/trait-reason-get-message';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { TraitReasonGetCode } from './traits/trait-reason-get-code';
import { TraitReasonGetStack } from './traits/trait-reason-get-stack';

export type TCode = number | string;

export interface IReasonLike<GCode extends TCode> extends
  // traits
  TraitReasonGetCode<any, GCode>,
  TraitReasonGetMessage<any>,
  TraitReasonGetStack<any>
  //
{
}

export type TGenericReasonLike = IReasonLike<TCode>;

export function IsReasonLike<GCode extends TCode>(value: any): value is IReasonLike<GCode> {
  return TraitIsImplementedBy(TraitReasonGetCode, value)
    && TraitIsImplementedBy(TraitReasonGetMessage, value)
    && TraitIsImplementedBy(TraitReasonGetStack, value);
}


/** TYPES **/

