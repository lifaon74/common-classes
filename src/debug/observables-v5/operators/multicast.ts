import { IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';
import { createSource } from '../misc/source/create-source';
import { ISource } from '../misc/source/source-interface';

export function multicastOperator<GValue>(): IOperatorFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let unsubscribe: IUnsubscribeFunction;
    const source: ISource<GValue> = createSource<GValue>({
      onActive(): void {
        unsubscribe = subscribe((value: GValue) => {
          source.emit(value);
        });
      },
      onInactive(): void {
        unsubscribe();
      },
    });
    return source.subscribe;
  };
}
