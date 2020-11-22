import { TGenericObservableLike } from '../../observable-types';
import {
  TInferPipeThroughLikeFromObservableAndTransform, TPipeThroughLikeGTransformConstraintWithEventListenerOn,
} from '../../../pipe-through/pipe-through-types';
import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitObservablePipeThroughSoft<GSelf extends TGenericObservableLike> {
  abstract pipeThroughSoft<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(
    this: GSelf,
    transform: GTransform,
  ): TInferPipeThroughLikeFromObservableAndTransform<GSelf, GTransform>;
}
