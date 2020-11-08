import { TGenericObservableLike } from '../observable-types';
import { PipeThrough } from '../../pipe-through/class/pipe-through-class';
import {
  IPipeThroughLike, TPipeThroughLikeGTransformConstraintWithEventListenerOn,
} from '../../pipe-through/pipe-through-types';
import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitObservablePipeThroughSoft<GSelf extends TGenericObservableLike> {
  pipeThroughSoft<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(this: GSelf, transform: GTransform): IPipeThroughLike<GSelf, GTransform> {
    return new PipeThrough<GSelf, GTransform>(this, transform);
  }
}
