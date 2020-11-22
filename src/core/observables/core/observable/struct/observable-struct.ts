import { TGenericObserverLike } from '../../observer/observer-types';
import { IEventListenerStruct } from '../../../../event-listener/raw/struct/event-listener-struct';
import { HasProperty, IsObject } from '@lifaon/traits';
import { TObservableKeyValueTupleUnion } from '../observable-types';

/** PRIVATE CONTEXT **/

export const OBSERVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('observable-private-context');

export interface IObservablePrivateContext<GObserver extends TGenericObserverLike> {
  readonly observers: GObserver[];
}

/** STRUCT DEFINITION **/


export interface IObservableStruct<GObserver extends TGenericObserverLike> extends IEventListenerStruct<TObservableKeyValueTupleUnion<GObserver>> {
  readonly [OBSERVABLE_PRIVATE_CONTEXT]: IObservablePrivateContext<GObserver>;
}

export type TGenericObservableStruct = IObservableStruct<any>;

export function IsObservableStruct<GObserver extends TGenericObserverLike>(value: any): value is IObservableStruct<GObserver> {
  return IsObject(value)
    && HasProperty(value, OBSERVABLE_PRIVATE_CONTEXT);
}


