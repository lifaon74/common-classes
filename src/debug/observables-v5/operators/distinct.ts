import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous values
 */
export function distinctOperator<GValue>(): IOperatorFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let previousValue: GValue;
      return subscribe((value: GValue): void => {
        if (value !== previousValue) {
          previousValue = value;
          emit(value);
        }
      });
    };
  };
}
