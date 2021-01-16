
import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';

export function subscribe<GValue>(
  subscribeFunction: ISubscribeFunction<GValue>,
  emitFunction: IEmitFunction<GValue>
): IUnsubscribeFunction {
  return subscribeFunction(emitFunction);
}
