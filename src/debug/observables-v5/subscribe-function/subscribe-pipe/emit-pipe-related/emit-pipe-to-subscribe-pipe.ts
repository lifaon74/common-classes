import { IEmitFunction } from '../../../types/emit-function/emit-function';
import {
  ISubscribeFunction, IUnsubscribeFunction
} from '../../../types/subscribe-function/subscribe-function';
import { IEmitPipeFunction } from '../../../types/emit-pipe-function/emit-pipe-function';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * Converts an emit pipe function to a subscribe pipe function
 */
export function emitPipeToSubscribePipe<GIn, GOut>(
  emitPipeFunction: IEmitPipeFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      return subscribe(emitPipeFunction(emit));
    };
  };
}
