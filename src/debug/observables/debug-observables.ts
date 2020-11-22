import { IObservable, Observable } from '../../core/observables/core/observable/class/observable-class';
import { IObserverLike } from '../../core/observables/core/observer/observer-types';
import {
  CreateSimpleTransform, TCreateSimpleTransformOutValueFunction,
} from '../../core/observables/core/transform/class/functions/create-simple-transform';
import { debugTransform } from './debug-tranform';
import { debugPipe } from './debug-pipe';
import { debugObservableAndObserverLink } from './debug-observable-and-observer-link';
import { TInferObservableEmitFunctionFromObserver } from '../../core/observables/core/observable/observable-types';
import { debugPipeThrough } from './debug-pipe-through';

// https://github.com/lifaon74/observables/blob/dev-3.0-ts-4.0-support/src/core/observable/interfaces.ts
// https://github.com/lifaon74/observables/tree/dev-3.0-ts-4.0-support/src/core/observable
// https://github.com/lifaon74/observables/blob/dev-3.0-ts-4.0-support/src/core/observer/implementation.ts


/*
OBSERVABLE           OBSERVER             OBSERVABLE
    ↓                ↑      ↓                 ↑
    -----> PIPE >-----      ---> TRANSFORM >---
    ↓                                ↑
    --------> PIPE THROUGH >----------
 */


class FromIterableObservable<GValue> extends Observable<IObserverLike<GValue>> {
  constructor(iterable: Iterable<GValue>) {
    const array = Array.isArray(iterable)
      ? iterable
      : Array.from(iterable);
    super((emit: TInferObservableEmitFunctionFromObserver<IObserverLike<GValue>>, observable: IObservable<IObserverLike<GValue>>) => {
      observable.on('add-observer', () => {
        for (let i = 0, l = array.length; i < l; i++) {
          emit(array[i]);
        }
      });
    });
  }
}



function filterTransform<GValueIn, GValueOut extends GValueIn>(filterFunction: (value: GValueIn) => value is GValueOut) {
  return CreateSimpleTransform<GValueIn, GValueOut>((value: GValueIn, emit: TCreateSimpleTransformOutValueFunction<GValueOut>) => {
    if (filterFunction(value)) {
      emit(value);
    }
  });
}


/*-----*/

// export async function testObservablePerfs() {
//
//   const range = (length: number): number[] => {
//     return Array.from({ length }, (v: any, i: number) => i);
//   };
//
//   const testSimpleEmit = () => { // 328 -> 307ms
//     let sum: number = 0;
//
//     const sub = new FromIterableObservable(range(1e7))
//       .pipeTo((value: number) => {
//         sum += value;
//       });
//
//     console.time('perf');
//     sub.activate();
//     console.timeEnd('perf');
//
//     console.log('sum', sum);
//   };
//
//   const testMap = () => { // 729 -> 719 ms
//     let sum: number = 0;
//
//     const sub = new FromIterableObservable(range(1e7))
//       .pipeThrough(mapTransform<number, number>(_ => (_ * 2)))
//       .pipeTo((value: number) => {
//         sum += value;
//       });
//
//     console.time('perf');
//     sub.activate();
//     console.timeEnd('perf');
//
//     console.log('sum', sum);
//   };
//
//   const testActivate = () => { // 2026 -> 2325 ms
//     let sum: number = 0;
//     const sub = new FromIterableObservable(range(1e2))
//       .pipeTo((value: number) => {
//         sum += value;
//       });
//
//     console.time('perf');
//     for (let i = 0; i < 1e6; i++) {
//       sub.activate().deactivate();
//     }
//     console.timeEnd('perf');
//
//     console.log('sum', sum);
//   };
//
//   const testActivateWithPipe = () => { // 1067 -> 1044 ms
//     let sum: number = 0;
//     const sub = new FromIterableObservable<number>(range(1e2))
//       .pipeThrough(mapTransform<number, number>(() => Math.random()))
//       .pipeTo((value: number) => {
//         sum += value;
//       });
//
//     console.time('perf');
//     for (let i = 0; i < 1e5; i++) {
//       sub.activate().deactivate();
//     }
//     console.timeEnd('perf');
//
//     console.log('sum', sum);
//   };
//
//   const testConstruct = () => { // 1207 -> 2035 ms
//     let sum: number = 0;
//     const array = range(1e2);
//
//
//     console.time('perf');
//     for (let i = 0; i < 1e5; i++) {
//       new FromIterableObservable(array)
//         .pipeThrough(mapTransform<number, number>(() => Math.random()))
//         .pipeTo((value: number) => {
//           sum += value;
//         })
//         .activate();
//     }
//     console.timeEnd('perf');
//
//     console.log('sum', sum);
//   };
//
//   // testSimpleEmit();
//   // testMap();
//   // testActivate();
//   // testActivateWithPipe();
//   testConstruct();
// }
//
// /*-----*/
//
// export async function debugObservableUsingTraits1() {
//   console.log('hello');
//
//   // const timer = (timeout: number) => {
//   //   return new Observable<Observer<number>>((emit) => {
//   //     setInterval(() => emit(Math.random()), timeout);
//   //   });
//   // }
//
//   const timer = (timeout: number) => new TimerObservable(timeout);
//
//   const _mapTransform = mapTransform<void, number>(() => Math.random());
//   // const observer = new Observer<number>((value: number) => {
//   //   console.log(value);
//   // });
//   //
//   // const observable = timer(1000);
//   //
//   // const sub = new Subscription(observable, observer);
//   // sub.activate();
//
//   // const pipe = timer(1000)
//   //   .pipeTo((value: void) => {
//   //     console.log('receive', value);
//   //   })
//   //   .activate();
//
//   // const pipe = new PipeThrough(timer(1000), mapTransform)
//   //   .activate()
//   //   .getObservable()
//   //   .pipeTo((value: number) => {
//   //     console.log('receive', value);
//   //   })
//   //   .activate()
//   // ;
//
//   const pipe = timer(1000)
//     // .pipeThroughSoft(mapTransform).activate().getObservable()
//     .pipeThrough(_mapTransform)
//     .pipeTo((value: number) => {
//       console.log('receive', value);
//     })
//     .activate();
//
//   (window as any).pipe = pipe;
//   (window as any).mapTransform = mapTransform;
// }
//
// export async function debugNotificationObservableUsingTraits1() {
//   // const notification = new Notification<'next', number>('next', 10);
//   // console.log(notification);
//   //
//   // const notificationObserver = new NotificationObserver<'next', number>('next', (notification: INotificationLike<'next', number>) => {
//   //   console.log(notification);
//   // });
//   //
//   // notificationObserver.emit(notification);
//   // console.log(notificationObserver);
//
//   const notificationObservable = new NotificationObservable<WindowEventMap>();
//   console.log(notificationObservable);
// }

export async function debugObservables() {
  // await debugObservableAndObserverLink();
  // await debugPipe();
  // await debugTransform();
  await debugPipeThrough();
}

