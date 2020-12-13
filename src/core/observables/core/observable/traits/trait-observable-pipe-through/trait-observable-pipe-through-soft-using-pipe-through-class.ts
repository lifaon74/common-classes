// import { TGenericObservableLike } from '../../simple/simple-observable-types';
// import { PipeThrough } from '../../../pipe-through/class/pipe-through-class';
// import {
//   TInferPipeThroughLikeFromObservableAndTransform, TPipeThroughLikeGTransformConstraintWithEventListenerOn,
// } from '../../../pipe-through/pipe-through-types';
// import { Trait } from '@lifaon/traits';
// import { TraitObservablePipeThroughSoft } from './trait-observable-pipe-through-soft';
//
//
// @Trait()
// export abstract class TraitObservablePipeThroughSoftUsingPipeThroughClass<GSelf extends TGenericObservableLike> extends TraitObservablePipeThroughSoft<GSelf> {
//   pipeThroughSoft<GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GSelf>>(
//     this: GSelf,
//     transform: GTransform,
//   ): TInferPipeThroughLikeFromObservableAndTransform<GSelf, GTransform> {
//     return PipeThrough.fromTransform<GSelf, GTransform>(this, transform);
//   }
// }
