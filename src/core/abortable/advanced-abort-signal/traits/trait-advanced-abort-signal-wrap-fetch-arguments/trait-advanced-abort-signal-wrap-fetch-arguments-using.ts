import { Trait } from '@lifaon/traits';
import {
  ILinkAdvancedAbortSignalWithFetchArgumentsAdvancedAbortSignal, LinkAdvancedAbortSignalWithFetchArguments
} from './functions/link-advanced-abort-signal-with-fetch-arguments';
import { TraitAdvancedAbortSignalWrapFetchArguments } from './trait-advanced-abort-signal-wrap-fetch-arguments';


export interface ITraitAdvancedAbortSignalWrapFetchArgumentsGSelfConstraint extends ILinkAdvancedAbortSignalWithFetchArgumentsAdvancedAbortSignal {
}

@Trait()
export abstract class TraitAdvancedAbortSignalWrapFetchArgumentsUsingToAbortController<GSelf extends ITraitAdvancedAbortSignalWrapFetchArgumentsGSelfConstraint> extends TraitAdvancedAbortSignalWrapFetchArguments<GSelf> {
  wrapFetchArguments(
    this: GSelf,
    requestInfo: RequestInfo, requestInit?: RequestInit
  ): [RequestInfo, RequestInit | undefined] {
    return [requestInfo, LinkAdvancedAbortSignalWithFetchArguments(this, requestInfo, requestInit)];
  }
}


