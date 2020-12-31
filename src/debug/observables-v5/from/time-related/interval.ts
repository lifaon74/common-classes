import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';


/**
 * Creates a SubscribeFunction that emits no value (void) every specified interval of time.
 */
export function interval(
  period: number,
): ISubscribeFunction<void> {
  return (emit: IEmitFunction<void>): IUnsubscribeFunction => {
    const timer: any = setInterval(() => emit(), period);
    return (): void => {
      clearInterval(timer);
    };
  };
}
