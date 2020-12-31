import { IUnsubscribeFunction } from '../../types';

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

