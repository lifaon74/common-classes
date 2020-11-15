import { IsObject } from '@lifaon/traits';
import { ExtractSignalFromFetchArguments } from './extract-signal-from-fetch-arguments';
import { AdvancedAbortController } from '../../../../advanced-abort-controller/class/advanced-abort-controller-class';
import { TraitAdvancedAbortSignalToAbortController } from '../../trait-advanced-abort-signal-to-abort-controller';

export interface ILinkAdvancedAbortSignalWithFetchArgumentsAdvancedAbortSignal extends TraitAdvancedAbortSignalToAbortController<any> {

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
  if (IsObject(globalThis) && ('AbortController' in globalThis)) {
    throw 'TODO'; // TODO
    // const signal: AbortSignal | null = ExtractSignalFromFetchArguments(requestInfo, requestInit);
    // const newSignal: TraitAdvancedAbortSignalToAbortController<any> =
    //   (signal === null)
    //     ? instance
    //     : AdvancedAbortController.fromAbortSignals(signal, instance).signal;
    //
    // requestInit = (requestInit === void 0)
    //   ? {}
    //   : { ...requestInit }; // shallow copy
    // requestInit.signal = newSignal.toAbortController().signal;
  }
  return requestInit;
}
