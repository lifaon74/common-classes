import { IPipeStruct, PIPE_PRIVATE_CONTEXT } from '../pipe-struct';
import { TraitPipeGetObservable } from '../../traits/trait-pipe-get-observable';
import { Impl } from '@lifaon/traits';
import { TGenericObservableLike } from '../../../observable/built-in/simple/simple-observable-types';
import { TGenericObserverLike } from '../../../observer/built-in/default/observer-types';


@Impl()
export class ImplTraitGetObservableForPipeStruct<GSelf extends IPipeStruct<GObservable, TGenericObserverLike>, GObservable extends TGenericObservableLike> extends TraitPipeGetObservable<GSelf, GObservable> {
  getObservable(this: GSelf): GObservable {
    return this[PIPE_PRIVATE_CONTEXT].observable;
  }
}
