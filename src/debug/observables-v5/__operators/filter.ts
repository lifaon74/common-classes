import { IEmitFunction } from '../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../types/subscribe-pipe-function/subscribe-pipe-function';

/**
 * @deprecated
 */
export function filterOperator<GIn>(filterFunction: (value: GIn) => boolean): ISubscribePipeFunction<GIn, GIn>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => value is GIn): ISubscribePipeFunction<GIn, GOut>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => boolean): ISubscribePipeFunction<GIn, GOut> {
  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      return subscribe((value: GIn): void => {
        if (filterFunction(value)) {
          emit(value as GOut);
        }
      });
    };
  };
}

