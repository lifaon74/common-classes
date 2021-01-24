import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function';
import { IEmitFunction } from '../../../types/emit-function/emit-function';


export function mergeAllSubscribePipe<GValue>(): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue> {
  return (subscribe: ISubscribeFunction<ISubscribeFunction<GValue>>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      const unsubscribe = subscribe((childSubscribe: ISubscribeFunction<GValue>): void => {
        childrenUnsubscribeFunctions.push(childSubscribe(emit));
      });
      return () => {
        unsubscribe();
        for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
          childrenUnsubscribeFunctions[i]();
        }
      };
    };
  };
}
