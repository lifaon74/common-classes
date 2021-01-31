import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * Emits a value from the source Observable, then ignores subsequent source values for a particular time span, then repeats this process.
 * @param duration - throttle time in milliseconds
 */
export function throttleOperator<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let timer: any | null = null;
      return subscribe((value: GValue): void => {
        if (timer === null) {
          emit(value);
          timer = setTimeout(() => {
            timer = null;
          }, duration);
        }
      });
    };
  };
}
