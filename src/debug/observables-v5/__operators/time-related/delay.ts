import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';


/**
 * Delays the emission of values from the source Observable by a given duration.
 * @param duration - delay time of each value in milliseconds
 */
export function delayOperator<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {

      let queue: Promise<void> = Promise.resolve();
      let running: boolean = true;
      const timers: Set<any> = new Set<any>();

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        const _queue: Promise<void> = queue; // fix ref
        const promise: Promise<void> = new Promise<void>((
          resolve: () => void,
        ): void => {
          const timer: any = setTimeout(() => {
            timers.delete(timer);
            _queue.then(() => {
              if (running) {
                emit(value);
                resolve();
              }
            });
          }, duration);
          timers.add(timer);
        });
        queue = _queue.then(() => promise);
      });

      return (): void => {
        running = false;
        unsubscribe();
        timers.forEach((timer: any) => {
          clearTimeout(timer);
        });
      };
    };
  };
}
