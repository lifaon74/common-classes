import { combineLatest, ICombineLatestSubscribeFunctionsValues } from '../combine-latest';
import { TGenericFunction } from '@lifaon/traits';
import { TMapValueTupleToSubscribeFunctionTuple } from '../types';
import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';
import { mapSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { distinctSubscribePipe } from '../../../subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';


export type IReactiveFunctionSubscribeFunctions<GFunction extends TGenericFunction> = TMapValueTupleToSubscribeFunctionTuple<Parameters<GFunction>>;

export function reactiveFunction<GFunction extends TGenericFunction>(
  fnc: GFunction,
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
): ISubscribeFunction<ReturnType<GFunction>> {
  type GSubscribeFunctions = IReactiveFunctionSubscribeFunctions<GFunction>;
  type GCombineLastSubscribeFunctions = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
    mapSubscribePipe<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
    distinctSubscribePipe<GOut>(),
  ]);
}
