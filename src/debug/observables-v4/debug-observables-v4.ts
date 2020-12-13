/*
Observable keypoints:

Observer:
 - it's just a function which receives data

Observable:
 - it sends data to one or many observers
 - it listen when it has or not observers to free resources
 - active / inactive event like should be hidden, like 'emit'

Pipe:
 - it links an observable with an observer (activate / deactivate)

Transform:
 - a tuple { observer, observable }
 - hidden link between observer and observable

PipeThrough:
 - observableA -> observer -> observableB
 - OR pipe(observableA, observer) -> observableB
 - OR observableA -> transform(observer, observableB)
 - if observableB is deactivated, remove observer from observableA

 */


// INFO the emit function provided by the lib user should be considered as unsafe (recursive, infinite loops, etc...)

import { PipeConstraint, pipeNow, PipeNowReturn } from './functional/pipe';
import { Observer } from './core/observer';
import { Observable, IObservableUnsubscribeFunction } from './core/observable';
import { IGenericOperatorFunction, mapOperator, notificationOperator } from './operators/operators';
import {
  fromFetch, fromIteratorWithNotifications, IObservableFromFetchNotifications
} from './observables/observables';
import { interval } from './observables/interval';
import { IGenericNotification } from './notifications/notification-interface';

/** HELPERS **/


/** OBSERVABLE OBSERVER **/

interface ObservableObserver<GObserver extends Observer<any>, GObservable extends Observable<any>> {
  observer: GObserver;
  observable: GObservable;
}

interface BasicObservableObserver<GObserverValue, GObservableValue> extends ObservableObserver<Observer<GObserverValue>, Observable<GObservableValue>> {
}


/** SUBSCRIPTION **/

class Subscription<GObserver extends Observer<any>, GObservable extends Observable<any>> {
  protected readonly _observable: GObservable;
  protected readonly _observer: GObserver;
  protected _unsubscribe: IObservableUnsubscribeFunction | null;

  constructor(
    observable: GObservable,
    observer: GObserver,
  ) {
    this._observable = observable;
    this._observer = observer;
    this._unsubscribe = null;
  }

  isActivated(): boolean {
    return this._unsubscribe !== null;
  }

  activate(): this {
    if (this._unsubscribe === null) {
      this._unsubscribe = this._observable.subscribe(this._observer);
    }
    return this;
  }

  deactivate(): this {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
    }
    return this;
  }

  toggle(activate: boolean = !this.isActivated()): this {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}


/** OPERATOR **/


/** PIPING **/

function pipeObservable<GObservable, GFunctions extends PipeConstraint<GFunctions, GObservable, IGenericOperatorFunction>>(
  observable: GObservable,
  ...fns: GFunctions
): PipeNowReturn<GObservable, GFunctions, IGenericOperatorFunction> {
  return pipeNow<GObservable, GFunctions, IGenericOperatorFunction>(observable, ...fns);
}


/** OBSERVABLES **/



// function multicast<GValue>(): BasicObservableObserver<GValue, GValue> {
//   const observers: IObserver<GValue>[] = [];
//   return {
//     observer: new Observer<GValue>((value: GValue) => {
//       for (let i = 0, l = observers.length; i < l; i++) {
//         observers[i].emit(value);
//       }
//     }),
//     observable: new Observable<GValue>((observer: IObserver<GValue>) => {
//       if (observers.includes(observer)) {
//         throw new Error(`Already subscribed to this Observable`);
//       } else {
//         observers.push(observer);
//         return singleCall(() => {
//           observers.slice(observers.indexOf(observer), 1);
//         });
//       }
//     })
//   };
// }


function pipeThrough() {

}


function testSlicePerf() {
  const array = Array.from({ length: 1e3 }, () => Math.random());
  const arrays = [];

  console.time('slice-perf');
  for (let i = 0; i < 1e5; i++) {
    const index: number = Math.floor(Math.random() * array.length);
    // const a = array.slice(0, index).concat(array.slice(index + 1)); // 900ms
    const a = array.slice();
    a.splice(index, 1); // 700ms
    arrays.push(a);
  }
  console.timeEnd('slice-perf');
  console.log(arrays);
}

/*---------------------------*/

function noCORS(url: string): string {
  const _url: URL = new URL(`https://cors-anywhere.herokuapp.com/`);
  _url.pathname = url;
  return _url.href;
}

async function debugObservable1() {
  // const observable = timer(500);

  const observable = pipeObservable(
    interval(1000),
    mapOperator(() => Math.random()),
    // multicast(),
  );

  const unsubscribe = observable
    .subscribe((value: any) => {
      console.log('ping', value);
    });

  // setTimeout(() => {
  //   observable
  //     .subscribe((value: any) => {
  //       console.log('ping2', value);
  //     });
  // }, 500);


  setTimeout(() => {
    unsubscribe();
  }, 2000);
}


async function debugObservable2() {
  const observable = pipeObservable(
    fromFetch(noCORS(`https://www.w3.org/TR/PNG/iso_8859-1.txt`)),
    notificationOperator<IObservableFromFetchNotifications, 'next'>('next')
  );

  const unsubscribe = observable
    .subscribe((value: any) => {
      console.log(value);
    });
}

async function debugObservable3() {
  const observable = pipeObservable(
    fromIteratorWithNotifications([0, 1, 2, 3, 4][Symbol.iterator]()),
  );

  const unsubscribe = observable
    .subscribe((value: any) => {
      console.log(value);
    });
}

export async function debugObservableV4() {
  // await debugObservable1();
  // await debugObservable2();
  await debugObservable3();
  // await testSlicePerf();
}
