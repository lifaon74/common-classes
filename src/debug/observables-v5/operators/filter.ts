import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';

export function filterOperator<GIn>(filterFunction: (value: GIn) => boolean): IOperatorFunction<GIn, GIn>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => value is GIn): IOperatorFunction<GIn, GOut>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => boolean): IOperatorFunction<GIn, GOut> {
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

