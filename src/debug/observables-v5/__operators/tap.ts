import { IEmitFunction } from '../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../types/subscribe-pipe-function/subscribe-pipe-function';

export function tapOperator<GValue>(callback: (value: GValue) => void): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      return subscribe((value: GValue): void => {
        callback(value);
        emit(value);
      });
    };
  };
}

export function logOperator<GValue>(
  name?: string,
): ISubscribePipeFunction<GValue, GValue> {
  return tapOperator<GValue>(
    (name === void 0)
      ? (value: GValue) => console.log(value)
      : (value: GValue) => console.log(name, value)
  );
}
