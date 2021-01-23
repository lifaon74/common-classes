import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function';
import { IEmitFunction } from '../../../types/emit-function/emit-function';
import { IAbortTimer } from '../../../misc/timer/abort-timer.type';
import { createAnimationFrame } from '../../../misc/timer/create-animation-frame';
import { createTimeout } from '../../../misc/timer/create-timeout';



export function debounceTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abort: IAbortTimer | null = null;
      return subscribe((value: GValue): void => {
        if (abort !== null) {
          abort();
        }
        abort = createTimeout(() => {
          abort = null;
          emit(value);
        }, duration);
      });
    };
  };
}
