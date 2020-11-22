import { TGenericObservableLike } from '../../observable-types';
import { TInferTransformLikeGObservable } from '../../../transform/transform-types';
import { Trait } from '@lifaon/traits';
import { TPipeThroughLikeGTransformConstraintWithEventListenerOn } from '../../../pipe-through/pipe-through-types';


@Trait()
export abstract class TraitObservablePipeThrough<GSelf extends TGenericObservableLike> {
  abstract pipeThrough<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(this: GSelf, transform: GTransform): TInferTransformLikeGObservable<GTransform>;
}
