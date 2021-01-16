import { pipeOperator } from './pipe-operator';
import { filterEmitPipe, IFilterFunction } from '../../pipes/filter-emit-pipe';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
/**
 * @deprecated
 */
export function filterOperator<GIn, GOut extends GIn>(
  filterFunction: IFilterFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  throw 'TODO';
  // return pipeOperator<GIn, GOut, [IFilterFunction<GIn, GOut>]>(filterPipe, [filterFunction]);
}



