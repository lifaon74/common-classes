import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../types';


export function reactiveOr(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof or>,
): ISubscribeFunction<ReturnType<typeof or>> {
  return reactiveFunction(
    or,
    subscribeFunctions,
  );
}


export function or(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (values[i]) {
      return true;
    }
  }
  return false;
}

