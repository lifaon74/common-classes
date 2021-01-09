import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { asyncUnsubscribe } from './async-unsubscribe';

export function subscribeOnce<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
): IUnsubscribeFunction {
  const unsubscribe = subscribe((value: GValue) => {
    unsubscribe();
    emit(value);
  });
  return unsubscribe;
}

export function subscribeOnceAsync<GValue>(
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
): IUnsubscribeFunction {
  const unsubscribe = subscribe((value: GValue) => {
    asyncUnsubscribe(() => unsubscribe);
    emit(value);
  });
  return unsubscribe;
}


