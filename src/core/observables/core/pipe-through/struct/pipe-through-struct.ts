import { TGenericObservableLike, TInferObservableLikeGObserver } from '../../observable/observable-types';
import { TInferTransformLikeGObservable } from '../../transform/transform-types';
import { IPipeLike } from '../../pipe/pipe-types';
import { TPipeThroughLikeGTransformConstraint } from '../pipe-through-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export type TUndoFunction = () => void;

export const PIPE_THROUGH_PRIVATE_CONTEXT: unique symbol = Symbol('pipe-through-private-context');

export interface IPipeThroughPrivateContext<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>> {
  readonly observable: TInferTransformLikeGObservable<GTransform>;
  pipe: IPipeLike<GObservable, TInferObservableLikeGObserver<GObservable>>;
  // pipe: IPipeLike<GObservable, TInferTransformLikeGObserver<GTransform>>;
  undo: TUndoFunction | null;
}

export type TPipeThroughPrivateContextFromGSelf<GSelf extends TGenericPipeThroughStruct> = IPipeThroughPrivateContext<TInferPipeThroughStructGObservable<GSelf>, TInferPipeThroughStructGGTransform<GSelf>>;


/** STRUCT DEFINITION **/

export interface IPipeThroughStruct<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>> {
  readonly [PIPE_THROUGH_PRIVATE_CONTEXT]: IPipeThroughPrivateContext<GObservable, GTransform>;
}

export type TGenericPipeThroughStruct = IPipeThroughStruct<any, any>;

export type TInferPipeThroughStructGObservable<GPipeThroughStruct extends TGenericPipeThroughStruct> =
  GPipeThroughStruct extends IPipeThroughStruct<infer GObservable, any>
    ? GObservable
    : never;

export type TInferPipeThroughStructGGTransform<GPipeThroughStruct extends TGenericPipeThroughStruct> =
  GPipeThroughStruct extends IPipeThroughStruct<infer GObservable, infer GTransform>
    ? (
      GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>
        ? GTransform
        : never
      )
    : never;

export function IsPipeThroughStruct<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraint<GObservable>>(value: any): value is IPipeThroughStruct<GObservable, GTransform> {
  return IsObject(value)
    && HasProperty(value, PIPE_THROUGH_PRIVATE_CONTEXT);
}
