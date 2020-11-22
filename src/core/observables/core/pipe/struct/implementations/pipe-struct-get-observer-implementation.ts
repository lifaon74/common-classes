import { IPipeStruct, PIPE_PRIVATE_CONTEXT } from '../pipe-struct';
import { TraitPipeGetObserver } from '../../traits/trait-pipe-get-observer';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../observer/observer-types';
import { IObservableLike } from '../../../observable/observable-types';

@Impl()
export class ImplTraitGetObserverForPipeStruct<GSelf extends IPipeStruct<IObservableLike<GObserver>, GObserver>, GObserver extends TGenericObserverLike> extends TraitPipeGetObserver<GSelf, GObserver> {
  getObserver(this: GSelf): GObserver {
    return this[PIPE_PRIVATE_CONTEXT].observer;
  }
}
