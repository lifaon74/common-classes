import { TGenericObserverLike } from '../../../../observer/built-in/default/observer-types';

/** PRIVATE CONTEXT **/

export const SIMPLE_OBSERVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('simple-observable-private-context');

export interface ISimpleObservablePrivateContext<GObserver extends TGenericObserverLike> {
  readonly observers: GObserver[];
}

/** STRUCT DEFINITION **/


export interface ISimpleObservableStruct<GObserver extends TGenericObserverLike> {
  readonly [SIMPLE_OBSERVABLE_PRIVATE_CONTEXT]: ISimpleObservablePrivateContext<GObserver>;
}

