import { mapOperator } from '../../../operators/map';
import { distinctOperator } from '../../../operators/distinct';
import { ISubscribeFunction } from '../../../types';
import { combineLatest, ICombineLatestSubscribeFunctionsValues } from '../combine-latest';
import { TGenericFunction } from '@lifaon/traits';
import { TMapValueTupleToSubscribeFunctionTuple } from '../types';
import { pipeSubscribeFunction } from '../../../misc/helpers/pipe-subscribe-function';


// export interface IReactiveFunction<GSubscribeFunctions extends IGenericSubscribeFunction[], GOut> {
//   (...args: ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>): GOut;
// }
//
// export function reactiveFunction<GSubscribeFunctions extends IGenericSubscribeFunction[], GOut>(
//   subscribeFunctions: GSubscribeFunctions,
//   reducer: IReactiveFunction<GSubscribeFunctions, GOut>,
// ): ISubscribeFunction<GOut> {
//   return combineLatest<GSubscribeFunctions>(subscribeFunctions)
//     .pipe(
//       mapOperator<ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>, GOut>(reducer),
//       distinctOperator<GOut>(),
//     );
// }


export type IReactiveFunctionSubscribeFunctions<GFunction extends TGenericFunction> = TMapValueTupleToSubscribeFunctionTuple<Parameters<GFunction>>;


export function reactiveFunction<GFunction extends TGenericFunction>(
  fnc: GFunction,
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
): ISubscribeFunction<ReturnType<GFunction>> {
  type GSubscribeFunctions = IReactiveFunctionSubscribeFunctions<GFunction>;
  type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
    mapOperator<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
    distinctOperator<GOut>(),
  ]);
}
