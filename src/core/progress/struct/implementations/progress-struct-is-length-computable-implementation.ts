import { PROGRESS_PRIVATE_CONTEXT, TGenericProgressStruct } from '../progress-struct';
import { Impl } from '@lifaon/traits';
import { TraitProgressIsLengthComputable } from '../../traits/trait-progress-is-length-computable';


@Impl()
export class ImplTraitIsLengthComputableForProgressStruct<GSelf extends TGenericProgressStruct> extends TraitProgressIsLengthComputable<GSelf> {
  isLengthComputable(this: GSelf): boolean {
    return this[PROGRESS_PRIVATE_CONTEXT].total !== Number.POSITIVE_INFINITY;
  }
}
