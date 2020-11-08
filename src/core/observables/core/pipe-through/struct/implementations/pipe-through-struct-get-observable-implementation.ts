import {
  PIPE_THROUGH_PRIVATE_CONTEXT, TGenericPipeThroughStruct, TInferPipeThroughStructGGTransform,
} from '../pipe-through-struct';
import { TraitPipeThroughGetObservable } from '../../traits/trait-pipe-through-get-observable';
import { TInferTransformLikeGObservable } from '../../../transform/transform-types';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitGetObservableForPipeThroughStruct<GSelf extends TGenericPipeThroughStruct> extends TraitPipeThroughGetObservable<GSelf, TInferTransformLikeGObservable<TInferPipeThroughStructGGTransform<GSelf>>> {
  getObservable(this: GSelf): TInferTransformLikeGObservable<TInferPipeThroughStructGGTransform<GSelf>> {
    return this[PIPE_THROUGH_PRIVATE_CONTEXT].observable as TInferTransformLikeGObservable<TInferPipeThroughStructGGTransform<GSelf>>;
  }
}
