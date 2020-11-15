import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitAdvancedAbortSignalWrapFetchArguments<GSelf> {
  abstract wrapFetchArguments(
    this: GSelf,
    requestInfo: RequestInfo, requestInit?: RequestInit
  ): [RequestInfo, RequestInit | undefined];
}


