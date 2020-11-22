import { Trait, TraitEmit } from '@lifaon/traits';

@Trait()
export abstract class TraitObserverEmit<GSelf, GValue> extends TraitEmit<GSelf, GValue, void> {
}

export type TGenericTraitObserverEmit = TraitObserverEmit<any, any>;
