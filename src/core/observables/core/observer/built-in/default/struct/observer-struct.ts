import { TObserverEmitFunction } from '../observer-types';

/** PRIVATE CONTEXT **/

export const OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('observer-private-context');

export interface IObserverPrivateContext<GValue> {
  readonly emit: TObserverEmitFunction<GValue>;
}

/** STRUCT DEFINITION **/

export interface IObserverStruct<GValue> {
  readonly [OBSERVER_PRIVATE_CONTEXT]: IObserverPrivateContext<GValue>;
}
