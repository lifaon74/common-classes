import { IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT, } from '../pipe-through-struct';
import { Impl } from '@lifaon/traits';
import { TGenericObservableLike } from '../../../observable/observable-types';
import { TraitPipeThroughGetObservable } from '../../traits/trait-pipe-through-get-observable';
import { TGenericPipeLike } from '../../../pipe/pipe-types';

@Impl()
export class ImplTraitGetObservableForPipeThroughStruct<// generics
  GSelf extends IPipeThroughStruct<TGenericPipeLike, GObservable>,
  GObservable extends TGenericObservableLike
  //
  > extends TraitPipeThroughGetObservable<GSelf, GObservable> {
  getObservable(this: GSelf): GObservable {
    return this[PIPE_THROUGH_PRIVATE_CONTEXT].observable;
  }
}
