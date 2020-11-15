import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitReasonGetCode<GSelf, GCode> {
  abstract getCode(this: GSelf): GCode;
}

export type TInferTraitReasonGetCodeGCode<GTrait extends TraitReasonGetCode<any, any>> =
  GTrait extends TraitReasonGetCode<any, infer GCode>
    ? GCode
    : never;
