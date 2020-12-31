import { ExtractSignalFromFetchArguments } from './extract-signal-from-fetch-arguments';
import { AdvancedAbortController } from '../../../../advanced-abort-controller/class/advanced-abort-controller-class';
import { TraitAdvancedAbortSignalToAbortController } from '../../trait-advanced-abort-signal-to-abort-controller';
import { IAdvancedAbortSignalLikeWithEvents } from '../../../advanced-abort-signal-types';
import { isAbortControllerSupported } from '../../../../../../debug/observables-v5/misc/abortable/is-abort-controller-supported';

export interface ILinkAdvancedAbortSignalWithFetchArgumentsAdvancedAbortSignal extends IAdvancedAbortSignalLikeWithEvents, TraitAdvancedAbortSignalToAbortController<any> {

}

/**
 * Links a AdvancedAbortSignal with the fetch arguments.
 * Returns the modified RequestInit
 */
export function LinkAdvancedAbortSignalWithFetchArguments(
  instance: ILinkAdvancedAbortSignalWithFetchArgumentsAdvancedAbortSignal,
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): RequestInit | undefined {
  if (isAbortControllerSupported()) {
    const signal: AbortSignal | null = ExtractSignalFromFetchArguments(requestInfo, requestInit);
    const newSignal: TraitAdvancedAbortSignalToAbortController<any> =
      (signal === null)
        ? instance
        : AdvancedAbortController.fromAbortSignals(signal, instance).getSignal();

    requestInit = (requestInit === void 0)
      ? {}
      : { ...requestInit }; // shallow copy
    requestInit.signal = newSignal.toAbortController().signal;
  }
  return requestInit;
}
