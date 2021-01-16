
import { IEmitFunction } from '../../../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';


/**
 * Creates a SubscribeFunction that emits when idle time is available.
 */
export function idle(): ISubscribeFunction<IdleDeadline> {
  return (emit: IEmitFunction<IdleDeadline>): IUnsubscribeFunction => {
    let running: boolean = true;
    let timer: any;
    const loop = () => {
      timer = requestIdleCallback((deadline: IdleDeadline) => {
        emit(deadline);
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
