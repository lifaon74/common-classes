import { TGenericObservableLike } from '../../observable/observable-types';
import { TGenericPipeLike } from '../../pipe/pipe-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export type TUndoFunction = () => void;

export const PIPE_THROUGH_PRIVATE_CONTEXT: unique symbol = Symbol('pipe-through-private-context');

export interface IPipeThroughPrivateContext<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLike
  //
  > {
  readonly pipe: GPipe;
  readonly observable: GObservable;
  undo: TUndoFunction | null;
}

export type TGenericPipeThroughPrivateContext = IPipeThroughPrivateContext<TGenericPipeLike, TGenericObservableLike>;

/** STRUCT DEFINITION **/

export interface IPipeThroughStruct<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLike
  //
  > {
  readonly [PIPE_THROUGH_PRIVATE_CONTEXT]: IPipeThroughPrivateContext<GPipe, GObservable>;
}

export type TGenericPipeThroughStruct = IPipeThroughStruct<TGenericPipeLike, TGenericObservableLike>;

export function IsPipeThroughStruct<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLike
  //
  >(value: any): value is IPipeThroughStruct<GPipe, GObservable> {
  return IsObject(value)
    && HasProperty(value, PIPE_THROUGH_PRIVATE_CONTEXT);
}
