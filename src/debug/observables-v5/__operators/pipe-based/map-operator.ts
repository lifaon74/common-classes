import { pipeOperator } from './pipe-operator';
import { IMapFunction, mapEmitPipe } from '../../pipes/map-emit-pipe';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * @deprecated
 */
export function mapOperator<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  throw 'TODO';
  // return pipeOperator<GIn, GOut, [IMapFunction<GIn, GOut>]>(mapPipe, [mapFunction]);
}



