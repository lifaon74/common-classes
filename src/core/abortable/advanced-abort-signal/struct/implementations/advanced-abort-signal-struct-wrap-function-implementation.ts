import { Impl } from '@lifaon/traits';
import { TGenericAdvancedAbortSignalStruct } from '../advanced-abort-signal-struct';
import {
  ITraitAdvancedAbortSignalWrapFunctionUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint,
  TraitAdvancedAbortSignalWrapFunctionUsingGetReasonAndIsAbortedAndOnAndIsDispatching
} from '../../traits/trait-advanced-abort-signal-wrap-function/trait-advanced-abort-signal-wrap-function-using-get-reason-and-is-aborted-and-on-and-is-dispatching';

export interface IImplTraitWrapFunctionForAdvancedAbortSignalStructGSelfConstraint extends TGenericAdvancedAbortSignalStruct,
  ITraitAdvancedAbortSignalWrapFunctionUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint {
}

@Impl()
export class ImplTraitWrapFunctionForAdvancedAbortSignalStruct<GSelf extends IImplTraitWrapFunctionForAdvancedAbortSignalStructGSelfConstraint> extends TraitAdvancedAbortSignalWrapFunctionUsingGetReasonAndIsAbortedAndOnAndIsDispatching<GSelf> {
}
