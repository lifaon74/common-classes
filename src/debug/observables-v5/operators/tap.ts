import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';

export function tapOperator<GValue>(callback: (value: GValue) => void): IOperatorFunction<GValue, GValue> {
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
): IOperatorFunction<GValue, GValue> {
  return tapOperator<GValue>(
    (name === void 0)
      ? (value: GValue) => console.log(value)
      : (value: GValue) => console.log(name, value)
  );
}
