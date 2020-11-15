import { TGenericObserverLike } from '../../observer/observer-types';
import { IEventListenerStruct } from '../../../../event-listener/raw/struct/event-listener-struct';
import { IObservableEventMap } from '../observable-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const OBSERVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('observable-private-context');

export interface IObservablePrivateContext<GObserver extends TGenericObserverLike> {
  readonly observers: GObserver[];
}

export type TObservablePrivateContextFromGSelf<GSelf extends TGenericObservableStruct> = IObservablePrivateContext<TInferObservableStructGObserver<GSelf>>;


/** STRUCT DEFINITION **/


export interface IObservableStruct<GObserver extends TGenericObserverLike> extends IEventListenerStruct<IObservableEventMap<GObserver>> {
  readonly [OBSERVABLE_PRIVATE_CONTEXT]: IObservablePrivateContext<GObserver>;
}

export type TGenericObservableStruct = IObservableStruct<any>;

export type TInferObservableStructGObserver<GObservableStruct extends TGenericObservableStruct> =
  GObservableStruct extends IObservableStruct<infer GObserver>
    ? GObserver
    : never;

export function IsObservableStruct<GObserver extends TGenericObserverLike>(value: any): value is IObservableStruct<GObserver> {
  return IsObject(value)
    && HasProperty(value, OBSERVABLE_PRIVATE_CONTEXT);
}


