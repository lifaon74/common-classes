import { TGenericFunction, Trait } from '@lifaon/traits';
import { TraitAdvancedAbortSignalIsAborted } from '../trait-advanced-abort-signal-is-aborted';
import { TraitAdvancedAbortSignalGetReason } from '../trait-advanced-abort-signal-get-reason';
import {
  TraitAdvancedAbortSignalWrapFunction, TTraitAdvancedAbortSignalWrapFunctionOnAborted,
  TTraitAdvancedAbortSignalWrapFunctionReturn, TTraitAdvancedAbortSignalWrapFunctionReturnedFunction
} from './trait-advanced-abort-signal-wrap-function';

export interface ITraitAdvancedAbortSignalWrapFunctionUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint extends TraitAdvancedAbortSignalGetReason<any>,
  TraitAdvancedAbortSignalIsAborted<any> {
}

@Trait()
export abstract class TraitAdvancedAbortSignalWrapFunctionUsingGetReasonAndIsAbortedAndOnAndIsDispatching<GSelf extends ITraitAdvancedAbortSignalWrapFunctionUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint> extends TraitAdvancedAbortSignalWrapFunction<GSelf> {
  wrapFunction<GFunction extends TGenericFunction, GOnAborted extends TTraitAdvancedAbortSignalWrapFunctionOnAborted>(
    this: GSelf,
    callback: GFunction,
    onAborted: GOnAborted,
  ): TTraitAdvancedAbortSignalWrapFunctionReturnedFunction<GFunction, GOnAborted> {
    return (...args: Parameters<GFunction>): TTraitAdvancedAbortSignalWrapFunctionReturn<GFunction, GOnAborted> => {
      return this.isAborted()
        ? onAborted(this.getReason())
        : callback(...args);
    };
  }
}


