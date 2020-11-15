import { Impl } from '@lifaon/traits';
import {
  ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT, TGenericAdvancedAbortControllerStruct
} from '../advanced-abort-controller-struct';
import { TraitAdvancedAbortControllerGetSignal } from '../../traits/trait-advanced-abort-controller-get-signal';
import { TGenericAdvancedAbortSignalLike } from '../../../advanced-abort-signal/advanced-abort-signal-types';

@Impl()
export class ImplTraitGetSignalForAdvancedAbortControllerStruct<GSelf extends TGenericAdvancedAbortControllerStruct, GSignal extends TGenericAdvancedAbortSignalLike> extends TraitAdvancedAbortControllerGetSignal<GSelf, GSignal> {
  getSignal(this: GSelf): GSignal {
    return this[ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT].signal;
  }
}
