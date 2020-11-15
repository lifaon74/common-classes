import { REASON_PRIVATE_CONTEXT, TGenericReasonStruct } from '../reason-struct';
import { Impl } from '@lifaon/traits';
import { TraitReasonGetStack } from '../../traits/trait-reason-get-stack';


@Impl()
export class ImplTraitGetStackForReasonStruct<GSelf extends TGenericReasonStruct> extends TraitReasonGetStack<GSelf> {
  getStack(this: GSelf): string {
    return this[REASON_PRIVATE_CONTEXT].stack;
  }
}
