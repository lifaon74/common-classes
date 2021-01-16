import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { createMulticastSource } from '../../source/multicast-source/create-multicast-source';
import { IEmitFunction } from '../../types/emit-function/emit-function';
import { IMulticastSource } from '../../source/multicast-source/multicast-source';

// https://rxjs-dev.firebaseapp.com/guide/subject
// https://rxjs-dev.firebaseapp.com/api/operators/refCount
// https://rxjs-dev.firebaseapp.com/api/operators/share
// https://rxjs-dev.firebaseapp.com/api/operators/multicast
// https://rxjs-dev.firebaseapp.com/api/operators/publish

/*
share <=> multicast(() => new Subject()), refCount())
share <=> pipe(publish(), refCount())

 */

export interface IShareSubscribePipeCreateMultiCastSource<GValue> {
  (): IMulticastSource<GValue>;
}

export function shareSubscribePipe<GValue>(
  createSource: IShareSubscribePipeCreateMultiCastSource<GValue> = createMulticastSource,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let unsubscribe: IUnsubscribeFunction;
    const source: IMulticastSource<GValue> = createSource();
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

