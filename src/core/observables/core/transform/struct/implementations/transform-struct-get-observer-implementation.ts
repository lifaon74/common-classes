import { ITransformStruct, TRANSFORM_PRIVATE_CONTEXT, } from '../transform-struct';
import { TraitTransformGetObserver } from '../../traits/trait-transform-get-observer';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../observer/observer-types';
import { TGenericObservableLike } from '../../../observable/observable-types';

@Impl()
export class ImplTraitGetObserverForTransformStruct<GSelf extends ITransformStruct<GObserver, TGenericObservableLike>, GObserver extends TGenericObserverLike> extends TraitTransformGetObserver<GSelf, GObserver> {
  getObserver(this: GSelf): GObserver {
    return this[TRANSFORM_PRIVATE_CONTEXT].observer;
  }
}

