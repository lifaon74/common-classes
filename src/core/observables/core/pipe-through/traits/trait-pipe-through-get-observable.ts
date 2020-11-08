import { TInferTraitGetObservableGObservable, TraitGetObservable } from '../../traits/trait-get-observable';
import { TGenericObservableLike } from '../../observable/observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeThroughGetObservable<GSelf, GObservable extends TGenericObservableLike> extends TraitGetObservable<GSelf, GObservable> {
}

export type TInferTraitPipeThroughGetObservableGValue<GTrait extends TraitPipeThroughGetObservable<any, any>> = TInferTraitGetObservableGObservable<GTrait>;
