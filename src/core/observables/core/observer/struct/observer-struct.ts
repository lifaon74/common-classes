import { TObserverEmitFunction } from '../observer-types';
import { HasProperty, IsObject } from '@lifaon/traits';

/** PRIVATE CONTEXT **/

export const OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('observer-private-context');

export interface IObserverPrivateContext<GValue> {
  readonly emit: TObserverEmitFunction<GValue>;
}

/** STRUCT DEFINITION **/

export interface IObserverStruct<GValue> {
  readonly [OBSERVER_PRIVATE_CONTEXT]: IObserverPrivateContext<GValue>;
}

export type TGenericObserverStruct = IObserverStruct<any>;

export function IsObserverStruct<GValue>(value: any): value is IObserverStruct<GValue> {
  return IsObject(value)
    && HasProperty(value, OBSERVER_PRIVATE_CONTEXT);
}
