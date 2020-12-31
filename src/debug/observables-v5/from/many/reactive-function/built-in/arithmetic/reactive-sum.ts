import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../types';

export function reactiveSum(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof sum>,
): ISubscribeFunction<ReturnType<typeof sum>> {
  return reactiveFunction(
    sum,
    subscribeFunctions,
  );
}


export function sum(...values: number[]): number {
  let sum: number = 0;
  for (let i = 0, l = values.length; i < l; i++) {
    sum += values[i];
  }
  return sum;
}

