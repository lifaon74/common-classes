import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';

export function fromArray<GValue>(
  array: ArrayLike<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    for (let i = 0, l = array.length; (i < l) && running; i++) {
      emit(array[i]);
    }
    return (): void => {
      running = false;
    };
  };
}
