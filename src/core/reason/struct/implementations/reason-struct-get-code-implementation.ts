import { REASON_PRIVATE_CONTEXT, TGenericReasonStruct, TInferReasonStructGCode, } from '../reason-struct';
import { Impl } from '@lifaon/traits';
import { TraitReasonGetCode } from '../../traits/trait-reason-get-code';


@Impl()
export class ImplTraitGetCodeForReasonStruct<GSelf extends TGenericReasonStruct> extends TraitReasonGetCode<GSelf, TInferReasonStructGCode<GSelf>> {
  getCode(this: GSelf): TInferReasonStructGCode<GSelf> {
    return this[REASON_PRIVATE_CONTEXT].code;
  }
}
