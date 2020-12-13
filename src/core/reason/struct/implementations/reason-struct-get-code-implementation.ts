import { IReasonStruct, REASON_PRIVATE_CONTEXT, } from '../reason-struct';
import { Impl } from '@lifaon/traits';
import { TraitReasonGetCode } from '../../traits/trait-reason-get-code';
import { TCode } from '../../reason-types';


@Impl()
export class ImplTraitGetCodeForReasonStruct<GSelf extends IReasonStruct<GCode>, GCode extends TCode> extends TraitReasonGetCode<GSelf, GCode> {
  getCode(this: GSelf): GCode {
    return this[REASON_PRIVATE_CONTEXT].code;
  }
}
