import { TGenericObservableLike } from '../../observable-types';
import { PipeThrough } from '../../../pipe-through/class/pipe-through-class';
import { TInferTransformLikeGObservable } from '../../../transform/transform-types';
import { Trait } from '@lifaon/traits';
import { TraitObservablePipeThrough } from './trait-observable-pipe-through';
import { TPipeThroughLikeGTransformConstraintWithEventListenerOn } from '../../../pipe-through/pipe-through-types';


@Trait()
export abstract class TraitObservablePipeThroughUsingPipeThroughClass<GSelf extends TGenericObservableLike> extends TraitObservablePipeThrough<GSelf> {
  pipeThrough<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(this: GSelf, transform: GTransform): TInferTransformLikeGObservable<GTransform> {
    return PipeThrough.fromTransform<GSelf, GTransform>(this, transform)
      .activate()
      .getObservable();
  }
}
