import { IEmitFunction } from '../types/emit-function/emit-function';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function';


export interface ITabCallback<GValue> {
  (value: GValue): void;
}

export function tapEmitPipe<GValue>(
  callback: ITabCallback<GValue>,
): IEmitPipeFunction<GValue, GValue> {
  return (emit: IEmitFunction<GValue>): IEmitFunction<GValue> => {
    return (value: GValue): void => {
      callback(value);
      emit(value);
    };
  };
}


