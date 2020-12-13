import { IProgressStruct, PROGRESS_PRIVATE_CONTEXT } from '../progress-struct';
import { Impl } from '@lifaon/traits';
import { TraitProgressGetCode } from '../../traits/trait-progress-get-code';
import { TCode } from '../../../reason/reason-types';


@Impl()
export class ImplTraitGetCodeForProgressStruct<GSelf extends IProgressStruct<GCode>, GCode extends TCode> extends TraitProgressGetCode<GSelf, GCode> {
  getCode(this: GSelf): GCode {
    return this[PROGRESS_PRIVATE_CONTEXT].code;
  }
}
