import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { idle } from '../time-related/idle';


export interface IExpressionFunction<GValue> {
  (): GValue;
}

/**
 * Creates an Observable that runs 'callback' when idle time is available, and emit distinct returned values.
 */
export function expression<GValue>(
  callback: IExpressionFunction<GValue>,
  trigger: ISubscribeFunction<void> = idle(),
): ISubscribeFunction<GValue> {
  // return pipeSubscribeFunction(trigger, [
  //   mapOperator<void, GValue>(callback),
  //   distinctOperator<GValue>(),
  // ]);

  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let previousValue: GValue;
    return trigger((): void => {
      const value: GValue = callback();
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}


