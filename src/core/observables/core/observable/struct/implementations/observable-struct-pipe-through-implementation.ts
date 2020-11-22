import { TGenericObservableLike } from '../../observable-types';
import { Impl } from '@lifaon/traits';
import { TraitObservablePipeThroughUsingPipeThroughClass } from '../../traits/trait-observable-pipe-through/trait-observable-pipe-through-using-pipe-through-class';

@Impl()
export class ImplTraitObservablePipeThroughForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThroughUsingPipeThroughClass<GSelf> {
}
