import { HasProperty, IsObject } from '@lifaon/traits';
import {
  TAdvancedAbortSignalAbortFunction, TGenericAdvancedAbortSignalLike
} from '../../advanced-abort-signal/advanced-abort-signal-types';

/** PRIVATE CONTEXT **/

export const ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT: unique symbol = Symbol('advanced-abort-controller-private-context');

export interface IAdvancedAbortControllerPrivateContext<GSignal extends TGenericAdvancedAbortSignalLike> {
  readonly signal: GSignal;
  readonly abort: TAdvancedAbortSignalAbortFunction;
}

export type TAdvancedAbortControllerPrivateContextFromGSelf<GSelf extends TGenericAdvancedAbortControllerStruct> = IAdvancedAbortControllerPrivateContext<TInferAdvancedAbortControllerStructGSignal<GSelf>>;


/** STRUCT DEFINITION **/

export interface IAdvancedAbortControllerStruct<GSignal extends TGenericAdvancedAbortSignalLike> {
  readonly [ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT]: IAdvancedAbortControllerPrivateContext<GSignal>;
}

export type TGenericAdvancedAbortControllerStruct = IAdvancedAbortControllerStruct<any>;

export type TInferAdvancedAbortControllerStructGSignal<GAdvancedAbortControllerStruct extends TGenericAdvancedAbortControllerStruct> =
  GAdvancedAbortControllerStruct extends IAdvancedAbortControllerStruct<infer GSignal>
    ? GSignal
    : never;

export function IsAdvancedAbortControllerStruct<GSignal extends TGenericAdvancedAbortSignalLike>(value: any): value is IAdvancedAbortControllerStruct<GSignal> {
  return IsObject(value)
    && HasProperty(value, ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT);
}
