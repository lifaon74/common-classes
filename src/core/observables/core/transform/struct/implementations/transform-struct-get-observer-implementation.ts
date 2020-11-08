import {
  TGenericTransformStruct, TInferTransformStructGObserver, TRANSFORM_PRIVATE_CONTEXT,
} from '../transform-struct';
import { TraitTransformGetObserver } from '../../traits/trait-transform-get-observer';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitGetObserverForTransformStruct<GSelf extends TGenericTransformStruct> extends TraitTransformGetObserver<GSelf, TInferTransformStructGObserver<GSelf>> {
  getObserver(this: GSelf): TInferTransformStructGObserver<GSelf> {
    return this[TRANSFORM_PRIVATE_CONTEXT].observer;
  }
}

