import { ISource } from '../source/source';
import { createMulticastSource } from '../source/multicast-source/create-multicast-source';
import { IEmitFunction } from '../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../types/subscribe-pipe-function/subscribe-pipe-function';

export function shareOperator<GValue>(
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let unsubscribe: IUnsubscribeFunction;
    const source: ISource<GValue> = createMulticastSource<GValue>();
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      const unsubscribeSource: IUnsubscribeFunction = source.subscribe(emit);
      if (source.getObservers().length === 1) {
        unsubscribe = subscribe((value: GValue) => {
          source.emit(value);
        });
      }
      return () => {
        unsubscribeSource();
        if (source.getObservers().length === 0) {
          unsubscribe();
        }
      };
    };
  };
}

