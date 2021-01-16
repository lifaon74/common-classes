import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function';
import { IEmitFunction } from '../../../types/emit-function/emit-function';


export function debounceFrameSubscribePipe<GValue>(
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let timer: any | null = null;
      return subscribe((value: GValue): void => {
        if (timer !== null) {
          cancelAnimationFrame(timer);
        }
        timer = requestAnimationFrame(() => {
          timer = null;
          emit(value);
        });
      });
    };
  };
}
