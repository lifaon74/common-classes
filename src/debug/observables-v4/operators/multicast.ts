import { IObservable, IObservableUnsubscribeFunction } from '../core/observable';
import { IOperatorFunction } from './operators';
import { ISource, Source } from '../core/source';

export function multicast<GValue>(): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): ISource<GValue> => {
    let unsubscribe: IObservableUnsubscribeFunction;
    const source: ISource<GValue> = new Source<GValue>({
      onActive(): void {
        unsubscribe = observable.subscribe((value: GValue) => {
          source.emit(value);
        });
      },
      onInactive(): void {
        unsubscribe();
      },
    });
    return source;
  };
}

// export function multicast<GValue>(): IOperatorFunction<GValue, GValue> {
//   return (observable: IObservable<GValue>): IObservable<GValue> => {
//
//     let observers: IObserver<GValue>[] = [];
//     let unsubscribe: IObservableUnsubscribeFunction | null = null;
//     let isDispatching: boolean = false;
//
//     return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
//       if (observers.includes(observer)) {
//         throw new Error(`Already subscribed to this Observable`);
//       } else {
//         if (isDispatching) {
//           observers = observers.slice();
//         }
//         observers.push(observer);
//         if (unsubscribe === null) {
//           unsubscribe = observable.subscribe((value: GValue): void => {
//             if (isDispatching) {
//               throw new Error(`The Observable is already dispatching a value. You probably created a recursive loop.`);
//             } else {
//               isDispatching = true;
//               const _observers: IObserver<GValue>[] = observers;
//               const lengthMinusOne: number = _observers.length - 1;
//               for (let i = 0; i < lengthMinusOne; i++) {
//                 _observers[i].emit(value);
//               }
//               isDispatching = false;
//               _observers[lengthMinusOne].emit(value);
//             }
//           });
//         }
//         return singleCall(() => {
//           if (isDispatching) {
//             observers = observers.slice();
//           }
//           observers.splice(observers.indexOf(observer), 1);
//           if (observers.length === 0) {
//             (unsubscribe as IObservableUnsubscribeFunction)();
//             unsubscribe = null;
//           }
//         });
//       }
//     });
//   };
//
//
//   // return (observable: IObservable<GValue>): IObservable<GValue> => {
//   //   const observers: IObserver<GValue>[] = [];
//   //   // let observers: IObserver<GValue>[] = [];
//   //   let unsubscribe: IObservableUnsubscribeFunction | null;
//   //   let isDispatching: boolean = false;
//   //   return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
//   //     if (observers.includes(observer)) {
//   //       throw new Error(`Already subscribed to this Observable`);
//   //     } else {
//   //       observers.push(observer);
//   //       if (unsubscribe === null) {
//   //         unsubscribe = observable.subscribe((value: GValue): void => {
//   //           for (let i = 0, l = observers.length; i < l; i++) {
//   //             observers[i].emit(value);
//   //           }
//   //         });
//   //       }
//   //       return singleCall(() => {
//   //         observers.slice(observers.indexOf(observer), 1);
//   //         if (observers.length === 0) {
//   //           (unsubscribe as ObservableUnsubscribeFunction)();
//   //           unsubscribe = null;
//   //         }
//   //       });
//   //     }
//   //   });
//   // };
// }
