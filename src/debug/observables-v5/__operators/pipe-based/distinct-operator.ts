import { distinctEmitPipe } from '../../pipes/distinct-emit-pipe';
import { pipeOperator } from './pipe-operator';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * @deprecated
 */
export function distinctOperator<GValue>(): ISubscribePipeFunction<GValue, GValue> {
  return pipeOperator<GValue, GValue>(distinctEmitPipe());
}

