import { Trait, TraitEmit } from '@lifaon/traits';

@Trait()
export abstract class TraitObserverEmit<GSelf, GValue> extends TraitEmit<GSelf, GValue, void> {
}

export type TInferTraitObserverEmitGValue<GTrait extends TraitObserverEmit<any, any>> =
  GTrait extends TraitObserverEmit<any, infer GValue>
    ? GValue
    : never;
