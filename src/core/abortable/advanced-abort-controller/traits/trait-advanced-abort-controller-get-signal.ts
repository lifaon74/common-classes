import { Trait } from '@lifaon/traits';
import { TGenericAdvancedAbortSignalLike } from '../../advanced-abort-signal/advanced-abort-signal-types';

@Trait()
export abstract class TraitAdvancedAbortControllerGetSignal<GSelf, GSignal extends TGenericAdvancedAbortSignalLike> {
  abstract getSignal(this: GSelf): GSignal;
}

export type TInferTraitAdvancedAbortControllerGetSignalGSignal<GTrait extends TraitAdvancedAbortControllerGetSignal<any, any>> =
  GTrait extends TraitAdvancedAbortControllerGetSignal<any, infer GSignal>
    ? GSignal
    : never;
