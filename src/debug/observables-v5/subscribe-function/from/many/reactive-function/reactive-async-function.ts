import { combineLatest, ICombineLatestSubscribeFunctionsValues } from '../combine-latest';
import { TGenericFunction } from '@lifaon/traits';
import { TMapValueTupleToSubscribeFunctionTuple } from '../types';
import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function';
import {
  ISubscribeFunction, TInferSubscribeFunctionGValue
} from '../../../../types/subscribe-function/subscribe-function';
import { mapSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { distinctSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';
import { passthrough } from '../../../../misc/helpers/passthrough';
import { mergeAllSubscribePipe } from '../../../subscribe-pipe/merge-all/merge-all-subscribe-pipe';
import { mergeAllWithNotificationsSubscribeFunction } from '../../../subscribe-pipe/merge-all/with-notifications/merge-all-with-notifications';
import { IDefaultNotificationsUnion, IInferDefaultNotificationsUnionGValue } from '../../../../types/shared-types';

export interface IGenericAsyncFunction {
  (...args: any[]): ISubscribeFunction<IDefaultNotificationsUnion<any>>;
}

export type IReactiveAsyncFunctionSubscribeFunctions<GFunction extends IGenericAsyncFunction> = TMapValueTupleToSubscribeFunctionTuple<Parameters<GFunction>>;
export type IReactiveAsyncFunctionReturnedNotificationUnion<GFunction extends IGenericAsyncFunction> = TInferSubscribeFunctionGValue<ReturnType<GFunction>>;
export type IReactiveAsyncFunctionReturnedValue<GFunction extends IGenericAsyncFunction> = IInferDefaultNotificationsUnionGValue<IReactiveAsyncFunctionReturnedNotificationUnion<GFunction>>;
export type IReactiveAsyncFunctionReturn<GFunction extends IGenericAsyncFunction> = ISubscribeFunction<IReactiveAsyncFunctionReturnedValue<GFunction>>;

// TODO

// export function reactiveAsyncFunction<GFunction extends IGenericAsyncFunction>(
//   fnc: GFunction,
//   subscribeFunctions: IReactiveAsyncFunctionSubscribeFunctions<GFunction>,
// ): IReactiveAsyncFunctionReturn<GFunction> {
//   type GSubscribeFunctions = IReactiveAsyncFunctionSubscribeFunctions<GFunction>;
//   type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
//   type GOutNotification = IReactiveAsyncFunctionReturnedNotificationUnion<GFunction>;
//   type GOut = IReactiveAsyncFunctionReturnedValue<GFunction>;
//
//   return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
//     mapSubscribePipe<GCombineLastSubscribeFunctions, ISubscribeFunction<GOutNotification>>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any)) as ISubscribeFunction<GOutNotification>),
//     mergeAllWithNotificationsSubscribeFunction<GOut>(),
//   ]) as any;
// }


// export interface IGenericAsyncFunction {
//   (...args: any[]): Promise<any>;
// }
//
// export type IReactiveAsyncFunctionSubscribeFunctions<GFunction extends IGenericAsyncFunction> = TMapValueTupleToSubscribeFunctionTuple<Parameters<GFunction>>;
// export type IReactiveAsyncFunctionReturn<GFunction extends IGenericAsyncFunction> = ISubscribeFunction<ReturnType<GFunction>>;
//
// export function reactiveAsyncFunction<GFunction extends IGenericAsyncFunction>(
//   fnc: GFunction,
//   subscribeFunctions: IReactiveAsyncFunctionSubscribeFunctions<GFunction>,
//   distinct: boolean = false,
// ): IReactiveAsyncFunctionReturn<GFunction> {
//   type GSubscribeFunctions = IReactiveAsyncFunctionSubscribeFunctions<GFunction>;
//   type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
//   type GOut = ReturnType<GFunction>;
//
//   return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
//     mapSubscribePipe<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
//     distinct ? distinctSubscribePipe<GOut>() : passthrough,
//   ]);
// }

