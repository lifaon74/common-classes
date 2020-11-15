import { REASON_PRIVATE_CONTEXT, TGenericReasonStruct } from '../reason-struct';
import { Impl } from '@lifaon/traits';
import { TraitReasonGetMessage } from '../../traits/trait-reason-get-message';


@Impl()
export class ImplTraitGetMessageForReasonStruct<GSelf extends TGenericReasonStruct> extends TraitReasonGetMessage<GSelf> {
  getMessage(this: GSelf): string {
    return this[REASON_PRIVATE_CONTEXT].message;
  }
}
