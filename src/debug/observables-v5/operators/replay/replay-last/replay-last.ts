import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';
import { pipeOperatorFunctions } from '../../../misc/helpers/pipe-operator-functions';
import { shareOperator } from '../../share';

export function replayLastOperator<GValue>(): IOperatorFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let previousValue: GValue;
    let received: boolean = false;
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      if (received) {
        emit(previousValue);
      }
      return subscribe((value: GValue) => {
        previousValue = value;
        received = true;
        emit(previousValue);
      });
    };
  };
}

export function replayLastSharedOperator<GValue>(): IOperatorFunction<GValue, GValue> {
  return pipeOperatorFunctions([
    shareOperator<GValue>({ disableDuplicateSubscribeVerification: true }),
    replayLastOperator<GValue>(),
  ]);
}
