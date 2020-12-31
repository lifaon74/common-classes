import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';

export function subscribe<GValue>(
  subscribeFunction: ISubscribeFunction<GValue>,
  emitFunction: IEmitFunction<GValue>
): IUnsubscribeFunction {
  return subscribeFunction(emitFunction);
}
