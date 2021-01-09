import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';
import { ISource } from '../misc/source/source-interface';
import { createSource, ICreateSourceOptions } from '../misc/source/create-source';

export function shareOperator<GValue>(
  options?: ICreateSourceOptions,
): IOperatorFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let unsubscribe: IUnsubscribeFunction;
    const source: ISource<GValue> = createSource<GValue>(options);
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      const unsubscribeSource: IUnsubscribeFunction = source.subscribe(emit);
      if (source.getObservers().length === 1) {
        unsubscribe = subscribe((value: GValue) => {
          source.emit(value);
        });
      }
      return () => {
        unsubscribeSource();
        if (source.getObservers().length === 0) {
          unsubscribe();
        }
      };
    };
  };
}

