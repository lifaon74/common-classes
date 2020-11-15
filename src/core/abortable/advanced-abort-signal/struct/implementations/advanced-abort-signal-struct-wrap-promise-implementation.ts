import { Impl } from '@lifaon/traits';
import { TGenericAdvancedAbortSignalStruct } from '../advanced-abort-signal-struct';
import {
  ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint,
  TraitAdvancedAbortSignalWrapPromiseUsingGetReasonAndIsAbortedAndOnAndIsDispatching
} from '../../traits/trait-advanced-abort-signal-wrap-promise/trait-advanced-abort-signal-wrap-promise-using-get-reason-and-is-aborted-and-on-and-is-dispatching';

export interface IImplTraitWrapPromiseForAdvancedAbortSignalStructGSelfConstraint extends TGenericAdvancedAbortSignalStruct,
  ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint {
}

@Impl()
export class ImplTraitWrapPromiseForAdvancedAbortSignalStruct<GSelf extends IImplTraitWrapPromiseForAdvancedAbortSignalStructGSelfConstraint> extends TraitAdvancedAbortSignalWrapPromiseUsingGetReasonAndIsAbortedAndOnAndIsDispatching<GSelf> {
}
