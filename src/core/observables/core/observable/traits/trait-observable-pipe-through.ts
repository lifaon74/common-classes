import { TGenericObservableLike } from '../observable-types';
import { PipeThrough } from '../../pipe-through/class/pipe-through-class';
import { TPipeThroughLikeGTransformConstraintWithEventListenerOn } from '../../pipe-through/pipe-through-types';
import { TInferTransformLikeGObservable } from '../../transform/transform-types';
import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitObservablePipeThrough<GSelf extends TGenericObservableLike> {
  pipeThrough<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(this: GSelf, transform: GTransform): TInferTransformLikeGObservable<GTransform> {
    return new PipeThrough<GSelf, GTransform>(this, transform).activate().getObservable();
  }
}
