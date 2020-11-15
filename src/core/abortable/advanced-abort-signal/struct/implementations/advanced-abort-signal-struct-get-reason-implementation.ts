import {
  ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT, TGenericAdvancedAbortSignalStruct
} from '../advanced-abort-signal-struct';
import { Impl } from '@lifaon/traits';
import { TraitAdvancedAbortSignalGetReason } from '../../traits/trait-advanced-abort-signal-get-reason';

@Impl()
export class ImplTraitGetReasonForAdvancedAbortSignalStruct<GSelf extends TGenericAdvancedAbortSignalStruct> extends TraitAdvancedAbortSignalGetReason<GSelf> {
  getReason(this: GSelf): any {
    return this[ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT].reason;
  }
}
