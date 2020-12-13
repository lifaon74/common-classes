import { IObserverLike } from './observer-like';

export type TObserverEmitFunction<GValue> = (value: GValue) => void;

export type TGenericObserverLike = IObserverLike<any>;

export type TInferObserverLikeGValue<GObserver extends TGenericObserverLike> =
  GObserver extends IObserverLike<infer GValue>
    ? GValue
    : never;
