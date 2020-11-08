import { TInferTraitGetObservableGObservable, TraitGetObservable } from '../../traits/trait-get-observable';
import { TGenericObservableLike } from '../../observable/observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeGetObservable<GSelf, GObservable extends TGenericObservableLike> extends TraitGetObservable<GSelf, GObservable> {
}

export type TInferTraitPipeGetObservableGValue<GTrait extends TraitPipeGetObservable<any, any>> = TInferTraitGetObservableGObservable<GTrait>;
