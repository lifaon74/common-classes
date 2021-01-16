import { createMulticastSource } from '../multicast-source/create-multicast-source';
import { IReplayLastSource } from './replay-last-source';
import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ISource } from '../source';
import { IMulticastSource } from '../multicast-source/multicast-source';
import { createUnicastSource } from '../unicast-source/create-unicast-source';
import { IUnicastSource } from '../unicast-source/unicast-source';

export function createReplayLastSource<GValue, GSource extends ISource<GValue>>(
  currentValue: GValue,
  source: GSource,
): IReplayLastSource<GValue, GSource> {
  const emit: IEmitFunction<GValue> = (value: GValue) => {
    currentValue = value;
    source.emit(value);
  };

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    emit(currentValue);
    return source.subscribe(emit);
  };

  return Object.freeze({
    ...source,
    getValue: (): GValue => {
      return currentValue;
    },
    emit,
    subscribe,
  });
}

export function createMulticastReplayLastSource<GValue>(
  currentValue: GValue,
  disableDuplicateSubscribeVerification?: boolean,
): IReplayLastSource<GValue, IMulticastSource<GValue>> {
  return createReplayLastSource<GValue, IMulticastSource<GValue>>(
    currentValue,
    createMulticastSource<GValue>(disableDuplicateSubscribeVerification),
  );
}

export function createUnicastReplayLastSource<GValue>(
  currentValue: GValue,
): IReplayLastSource<GValue, IUnicastSource<GValue>> {
  return createReplayLastSource<GValue, IUnicastSource<GValue>>(
    currentValue,
    createUnicastSource<GValue>(),
  );
}

// export function createReplayLastSource<GValue>(
//   value: GValue,
// ): IReplayLastSource<GValue> {
//   const source: IMulticastSource<GValue> = createMulticastSource<GValue>(true);
//
//   const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//     emit(value);
//     return source.subscribe((_value: GValue) => {
//       value = _value;
//       emit(_value);
//     });
//   };
//
//   return Object.freeze({
//     ...source,
//     subscribe,
//     getValue: (): GValue => {
//       return value;
//     },
//   });
// }

