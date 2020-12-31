import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';

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

