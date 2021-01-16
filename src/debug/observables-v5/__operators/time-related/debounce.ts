import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * Emits a value from the source Observable only after a particular time span has passed without another source emission.
 * @param duration - debounce time in milliseconds
 */
export function debounceOperator<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let timer: any | null = null;
      return subscribe((value: GValue): void => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          emit(value);
        }, duration);
      });
    };
  };
}
