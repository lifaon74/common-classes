import { IEmitFunction } from '../../types/emit-function/emit-function';
import {
  ISubscribeFunction, IUnsubscribeFunction
} from '../../types/subscribe-function/subscribe-function';
import { IEmitPipeFunction } from '../../types/emit-pipe-function/emit-pipe-function';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * @deprecated
 */
export function pipeOperator<GIn, GOut>(
  pipeFunction: IEmitPipeFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      return subscribe(pipeFunction(emit));
    };
  };
}
