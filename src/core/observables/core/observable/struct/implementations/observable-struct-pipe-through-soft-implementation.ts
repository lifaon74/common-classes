import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeThroughSoft } from '../../traits/trait-observable-pipe-through-soft';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitObservablePipeThroughSoftForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThroughSoft<GSelf> {
}
