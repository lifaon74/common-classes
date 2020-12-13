import { Trait } from '@lifaon/traits';
import { TCode } from '../reason-types';

@Trait()
export abstract class TraitReasonGetCode<GSelf, GCode extends TCode> {
  abstract getCode(this: GSelf): GCode;
}

export type TInferTraitReasonGetCodeGCode<GTrait extends TraitReasonGetCode<any, any>> =
  GTrait extends TraitReasonGetCode<any, infer GCode>
    ? GCode
    : never;
