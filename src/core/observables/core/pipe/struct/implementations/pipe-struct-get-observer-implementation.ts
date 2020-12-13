import { IPipeStruct, PIPE_PRIVATE_CONTEXT } from '../pipe-struct';
import { TraitPipeGetObserver } from '../../traits/trait-pipe-get-observer';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../observer/built-in/default/observer-types';
import { ISimpleObservableLike } from '../../../observable/built-in/simple/simple-observable-types';

@Impl()
export class ImplTraitGetObserverForPipeStruct<GSelf extends IPipeStruct<ISimpleObservableLike<GObserver>, GObserver>, GObserver extends TGenericObserverLike> extends TraitPipeGetObserver<GSelf, GObserver> {
  getObserver(this: GSelf): GObserver {
    return this[PIPE_PRIVATE_CONTEXT].observer;
  }
}
