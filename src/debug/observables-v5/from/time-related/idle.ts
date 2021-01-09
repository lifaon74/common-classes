import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';


/**
 * Creates a SubscribeFunction that emits no value (void) when idle time is available.
 */
export function idle(): ISubscribeFunction<void> {
  return (emit: IEmitFunction<void>): IUnsubscribeFunction => {
    let running: boolean = true;
    let timer: any;
    const loop = () => {
      timer = requestIdleCallback(() => {
        emit();
        if (running) {
          loop();
        }
      });
    };
    loop();
    return (): void => {
      if (running) {
        running = false;
        cancelIdleCallback(timer);
      }
    };
  };
}
