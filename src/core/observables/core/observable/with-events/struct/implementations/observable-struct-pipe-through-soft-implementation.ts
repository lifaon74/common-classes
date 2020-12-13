import { TGenericObservableLike } from '../../../built-in/simple/simple-observable-types';
import { Impl } from '@lifaon/traits';
import { TraitObservablePipeThroughSoftUsingPipeThroughClass } from '../../../traits/trait-observable-pipe-through/trait-observable-pipe-through-soft-using-pipe-through-class';

@Impl()
export class ImplTraitObservablePipeThroughSoftForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThroughSoftUsingPipeThroughClass<GSelf> {
}
