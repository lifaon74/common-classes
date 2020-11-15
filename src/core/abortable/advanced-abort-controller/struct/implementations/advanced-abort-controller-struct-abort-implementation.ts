import {
  ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT, TGenericAdvancedAbortControllerStruct
} from '../advanced-abort-controller-struct';
import { Impl } from '@lifaon/traits';
import { TraitAdvancedAbortControllerAbort } from '../../traits/trait-advanced-abort-controller-abort';

@Impl()
export class ImplTraitAbortForAdvancedAbortControllerStruct<GSelf extends TGenericAdvancedAbortControllerStruct> extends TraitAdvancedAbortControllerAbort<GSelf> {
  abort(this: GSelf, reason?: any): void {
    this[ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT].abort(reason);
  }
}
