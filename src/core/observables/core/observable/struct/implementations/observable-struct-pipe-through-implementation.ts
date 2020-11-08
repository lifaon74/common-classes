import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeThrough } from '../../traits/trait-observable-pipe-through';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitObservablePipeThroughForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThrough<GSelf> {
}
