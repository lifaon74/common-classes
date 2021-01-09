import { pipe, PipeReturn } from '../../functional/pipe';
import { IGenericOperatorFunction } from '../../types';
import { ISubscribeFunctionPipeConstraint } from './pipe-subscribe-function';


export type IPipeOperatorFunctionsReturn<GFunctions extends readonly IGenericOperatorFunction[]>
  = PipeReturn<GFunctions, IGenericOperatorFunction>;


export function pipeOperatorFunctions<GFunctions extends ISubscribeFunctionPipeConstraint<any, GFunctions>>(
  fns: GFunctions
): IPipeOperatorFunctionsReturn<GFunctions> {
  return pipe<GFunctions, IGenericOperatorFunction>(fns);
}


