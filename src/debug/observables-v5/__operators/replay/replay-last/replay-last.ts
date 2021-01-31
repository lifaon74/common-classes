import { pipeSubscribePipeFunctions } from '../../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { shareOperator } from '../../share';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

/**
 * @deprecated
 */
export function replayLastOperator<GValue>(): ISubscribePipeFunction<GValue, GValue> {
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

/**
 * TODO create a ReplaySource instead, else emitted values are lost
 * @deprecated
 */
export function replayLastSharedOperator<GValue>(): ISubscribePipeFunction<GValue, GValue> {
  return pipeSubscribePipeFunctions([
    shareOperator<GValue>(),
    replayLastOperator<GValue>(),
  ]);
}

// export function replayLastSharedOperator<GValue>(): IOperatorFunction<GValue, GValue> {
//   return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
//     let unsubscribe: IUnsubscribeFunction = subscribe();
//
//     const source: ISource<GValue> = createSource<GValue>();
//     return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//       const unsubscribeSource: IUnsubscribeFunction = source.subscribe(emit);
//       if (source.getObservers().length === 1) {
//         unsubscribe = subscribe((value: GValue) => {
//           source.emit(value);
//         });
//       }
//       return () => {
//         unsubscribeSource();
//         if (source.getObservers().length === 0) {
//           unsubscribe();
//         }
//       };
//     };
//   };
// }
