import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * Emits a value from the source Observable, then, for a duration determined by 'duration', if a value is received, cache it and emits it at the end of the timer.
 * As result, a value if emitted evey 'duration' ms at the best, and the last emitted value if always transmitted.
 * @param duration - time interval between values in milliseconds
 */
export function periodOperator<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let timer: any | null = null;
      let previousValue: GValue;
      let hasValue: boolean = false;

      return subscribe(function _emit(value: GValue): void {
        if (timer === null) {
          emit(value);
          hasValue = false;
          timer = setTimeout(() => {
            timer = null;
            if (hasValue) {
              _emit(previousValue);
            }
          }, duration);
        } else {
          hasValue = true;
          previousValue = value;
        }
      });
    };
  };
}

