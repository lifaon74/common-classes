import { ITransformStruct, TRANSFORM_PRIVATE_CONTEXT, } from '../transform-struct';
import { TraitTransformGetObservable } from '../../traits/trait-transform-get-observable';
import { Impl } from '@lifaon/traits';
import { TGenericObservableLike } from '../../../observable/observable-types';
import { TGenericObserverLike } from '../../../observer/observer-types';

@Impl()
export class ImplTraitGetObservableForTransformStruct<GSelf extends ITransformStruct<TGenericObserverLike, GObservable>, GObservable extends TGenericObservableLike> extends TraitTransformGetObservable<GSelf, GObservable> {
  getObservable(this: GSelf): GObservable {
    return this[TRANSFORM_PRIVATE_CONTEXT].observable;
  }
}

