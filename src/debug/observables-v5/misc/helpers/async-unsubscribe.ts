import { IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';

/**
 * Try to unsubscribe immediately. If it fails, await next event loop to unsubscribe
 * INFO: this is useful to unsubscribe before the unsubscribe function is even assigned
 */
export function asyncUnsubscribe(
  getUnsubscribe: () => IUnsubscribeFunction
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
    reject: (reason: any) => void,
  ) => {
    let unsubscribe!: IUnsubscribeFunction;
    try {
      unsubscribe = getUnsubscribe();
    } catch (error) {
      if (
        (error instanceof ReferenceError)
        || (error.type === 'ReferenceError')
      ) {
        setImmediate(() => {
          try {
            getUnsubscribe()();
          } catch (error) {
            reject(error);
          }
        });
      } else {
        reject(error);
      }
      return;
    }
    unsubscribe();
    resolve();
  });
}

