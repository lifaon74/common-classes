import { IGenericObservable, IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';
import { Mutable } from '@lifaon/traits';

export type ICombineLatestObservablesValues<GObservables extends readonly IGenericObservable[]> = {
  readonly [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<infer GValue>
    ? GValue
    : never;
};

/**
 * Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.
 * INFO: provided 'observables' array MUST not change.
 * INFO: received arrays are readonly.
 */
export function combineLatest<GObservables extends readonly IGenericObservable[]>(
  observables: GObservables,
): IObservable<ICombineLatestObservablesValues<GObservables>> {
  type GValue = ICombineLatestObservablesValues<GObservables>;
  return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
    const length: number = observables.length;
    const values: Mutable<GValue> = Array.from({ length }) as Mutable<GValue>;
    const received: boolean[] = Array.from({ length });
    let receivedCount: number = 0;
    const unsubscribe: IObservableUnsubscribeFunction[] = observables
      .map((observable: IGenericObservable, index: number) => {
        return observable.subscribe((value: GValue) => {
          values[index] = value;
          if (!received[index]) {
            received[index] = true;
            receivedCount++;
          }
          if (receivedCount === length) {
            observer.emit(values);
          }
        });
      });
    return (): void => {
      for (let i = 0, l = unsubscribe.length; i < l; i++) {
        unsubscribe[i]();
      }
    };
  });
}


// export function combineLatest<GObservables extends IGenericObservable[]>(
//   observables: GObservables,
// ): IObservable<ICombineLatestObservablesValues<GObservables>> {
//   type GValue = ICombineLatestObservablesValues<GObservables>;
//   return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
//     const values: Mutable<GValue> = new Array(observables.length) as Mutable<GValue>;
//     const unsubscribe: IObservableUnsubscribeFunction[] = observables
//       .map((observable: IGenericObservable, index: number) => {
//         return observable.subscribe((value: GValue) => {
//           values[index] = value;
//           observer.emit(values);
//         });
//       });
//     return (): void => {
//       for (let i = 0, l = unsubscribe.length; i < l; i++) {
//         unsubscribe[i]();
//       }
//     };
//   });
// }
