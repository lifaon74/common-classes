import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';

/**
 * Emits a value from the source Observable, then ignores subsequent source values for a particular time span, then repeats this process.
 * @param duration - throttle time in milliseconds
 */
export function throttleOperator<GValue>(
  duration: number,
): IOperatorFunction<GValue, GValue> {
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
