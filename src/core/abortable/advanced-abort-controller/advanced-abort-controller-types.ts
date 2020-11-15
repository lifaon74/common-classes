import { TraitIsImplementedBy } from '@lifaon/traits';
import {
  IAdvancedAbortSignalLike, TGenericAdvancedAbortSignalLike
} from '../advanced-abort-signal/advanced-abort-signal-types';
import {
  TInferTraitAdvancedAbortControllerGetSignalGSignal, TraitAdvancedAbortControllerGetSignal
} from './traits/trait-advanced-abort-controller-get-signal';
import { TraitAdvancedAbortControllerAbort } from './traits/trait-advanced-abort-controller-abort';

export interface IAdvancedAbortControllerLike<GSignal extends TGenericAdvancedAbortSignalLike> extends TraitAdvancedAbortControllerGetSignal<any, GSignal>,
  TraitAdvancedAbortControllerAbort<any> {
}

export type TGenericAdvancedAbortControllerLike = IAdvancedAbortControllerLike<any>;

export type TInferAdvancedAbortControllerLikeGSignal<GAdvancedAbortControllerLike extends TGenericAdvancedAbortControllerLike> = TInferTraitAdvancedAbortControllerGetSignalGSignal<GAdvancedAbortControllerLike>;

export function IsAdvancedAbortControllerLike<GSignal extends TGenericAdvancedAbortSignalLike>(value: any): value is IAdvancedAbortControllerLike<GSignal> {
  return TraitIsImplementedBy(TraitAdvancedAbortControllerGetSignal, value)
    && TraitIsImplementedBy(TraitAdvancedAbortControllerAbort, value);
}

/** TYPES **/

export type TAbortSignalLike = AbortSignal | IAdvancedAbortSignalLike;
export type TAbortSignalLikeOrUndefined = TAbortSignalLike | undefined;
