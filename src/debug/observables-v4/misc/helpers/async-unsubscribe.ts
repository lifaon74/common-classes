import { IObservableUnsubscribeFunction } from '../../core/observable';


export function asyncUnsubscribe(
  getUnsubscribe: () => IObservableUnsubscribeFunction
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
    reject: (reason: any) => void,
  ) => {
    let unsubscribe!: IObservableUnsubscribeFunction;
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
            reject(error)
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

