import { emitPipeToSubscribePipe } from './emit-pipe-to-subscribe-pipe';
import { filterEmitPipe, IFilterFunction } from '../../../pipes/filter-emit-pipe';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * @see filterEmitPipe
 */
export function filterSubscribePipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunction<GIn, GOut>,
): ISubscribePipeFunction<GIn, GOut> {
  return emitPipeToSubscribePipe<GIn, GOut>(filterEmitPipe<GIn, GOut>(filterFunction));
}


