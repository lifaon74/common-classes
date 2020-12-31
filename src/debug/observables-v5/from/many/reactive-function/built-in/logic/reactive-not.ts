import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../types';


export function reactiveNot(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof not>,
): ISubscribeFunction<ReturnType<typeof not>> {
  return reactiveFunction(
    not,
    subscribeFunctions,
  );
}


export function not(value: boolean): boolean {
  return !value;
}

