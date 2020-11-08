import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeTo } from '../../traits/trait-observable-pipe-to';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitObservablePipeToForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeTo<GSelf> {
}
