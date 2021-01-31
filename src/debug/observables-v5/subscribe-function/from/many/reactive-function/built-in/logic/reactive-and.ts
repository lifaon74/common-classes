import { IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';
import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';


export function reactiveAnd(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<typeof and>,
): ISubscribeFunction<ReturnType<typeof and>> {
  return reactiveFunction(
    and,
    subscribeFunctions,
  );
}


export function and(...values: boolean[]): boolean {
  for (let i = 0, l = values.length; i < l; i++) {
    if (!values[i]) {
      return false;
    }
  }
  return true;
}

