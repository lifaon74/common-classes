import { IEmitFunction } from '../types/emit-function/emit-function';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function';

export interface IFilterFunction<GIn, GOut extends GIn> {
  (value: GIn): value is GOut;
}


export function filterEmitPipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunction<GIn, GOut>,
): IEmitPipeFunction<GIn, GOut> {
  return (emit: IEmitFunction<GOut>): IEmitFunction<GIn> => {
    return (value: GIn): void => {
      if (filterFunction(value)) {
        emit(value);
      }
    };
  };
}

