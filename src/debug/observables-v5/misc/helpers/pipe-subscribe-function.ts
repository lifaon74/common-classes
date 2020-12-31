import { PipeConstraint, pipeNow, PipeNowReturn } from '../../functional/pipe';
import { IGenericOperatorFunction, IGenericSubscribeFunction } from '../../types';


export type ISubscribeFunctionPipeConstraint<GSubscribeFunction extends IGenericSubscribeFunction, GFunctions extends readonly IGenericOperatorFunction[]>
  = PipeConstraint<GFunctions, GSubscribeFunction, IGenericOperatorFunction>;

export type ISubscribeFunctionPipeReturn<GSubscribeFunction extends IGenericSubscribeFunction, GFunctions extends readonly IGenericOperatorFunction[]>
  = PipeNowReturn<GSubscribeFunction, GFunctions, IGenericOperatorFunction>;


export function pipeSubscribeFunction<GSubscribeFunction extends IGenericSubscribeFunction, GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>>(
  subscribe: GSubscribeFunction,
  fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions> {
  return pipeNow<GSubscribeFunction, GFunctions, IGenericOperatorFunction>(subscribe, fns);
}

export function pipeSubscribeFunctionSpread<GSubscribeFunction extends IGenericSubscribeFunction, GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>>(
  subscribe: GSubscribeFunction,
  ...fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions> {
  return pipeSubscribeFunction<GSubscribeFunction, GFunctions>(subscribe, fns);
}
