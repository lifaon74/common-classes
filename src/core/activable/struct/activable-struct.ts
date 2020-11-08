import { HasProperty, IsObject } from '@lifaon/traits';
import { TActivableActivateFunction, TActivableDeactivateFunction } from '../activable-types';

/** PRIVATE CONTEXT **/

export const ACTIVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('activable-private-context');

export interface IActivablePrivateContext<GReturn> {
  isActivated: boolean;
  activate: TActivableActivateFunction<GReturn>;
  deactivate: TActivableDeactivateFunction<GReturn>;
}

/** STRUCT DEFINITION **/

export interface IActivableStruct<GReturn> {
  readonly [ACTIVABLE_PRIVATE_CONTEXT]: IActivablePrivateContext<GReturn>;
}

export type TGenericActivableStruct = IActivableStruct<any>;

export type TInferActivableStructGReturn<GActivableStruct extends TGenericActivableStruct> =
  GActivableStruct extends IActivableStruct<infer GReturn>
    ? GReturn
    : never;

export function IsActivableStruct<GReturn>(value: any): value is IActivableStruct<GReturn> {
  return IsObject(value)
    && HasProperty(value, ACTIVABLE_PRIVATE_CONTEXT);
}



