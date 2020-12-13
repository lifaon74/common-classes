import { Impl } from '@lifaon/traits';
import { TraitObservablePipeToUsingPipeToClass } from '../../../traits/trait-observable-pipe-to/trait-observable-pipe-to-using-pipe-to-class';
import { TGenericObserverLike } from '../../../../observer/built-in/default/observer-types';
import { IObservableStruct } from '../observable-struct';
import { ISimpleObservableLike } from '../../../built-in/simple/simple-observable-types';

export interface TImplTraitObservablePipeToForObservableStructGSelfConstraint<GObserver extends TGenericObserverLike> extends IObservableStruct<GObserver>, ISimpleObservableLike<GObserver> {

}

@Impl()
export class ImplTraitObservablePipeToForObservableStruct<GSelf extends TImplTraitObservablePipeToForObservableStructGSelfConstraint<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservablePipeToUsingPipeToClass<GSelf, GObserver> {
}
