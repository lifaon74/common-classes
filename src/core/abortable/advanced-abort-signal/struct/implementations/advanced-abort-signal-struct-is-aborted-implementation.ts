import {
  ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT, TGenericAdvancedAbortSignalStruct
} from '../advanced-abort-signal-struct';
import { Impl } from '@lifaon/traits';
import { TraitAdvancedAbortSignalIsAborted } from '../../traits/trait-advanced-abort-signal-is-aborted';

@Impl()
export class ImplTraitIsAbortedForAdvancedAbortSignalStruct<GSelf extends TGenericAdvancedAbortSignalStruct> extends TraitAdvancedAbortSignalIsAborted<GSelf> {
  isAborted(this: GSelf): boolean {
    return this[ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT].isAborted;
  }
}
