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

import { IObserver, Observer } from './core/observer';
import { IObservable, IObservableUnsubscribeFunction, Observable } from './core/observable';
import { notificationOperator } from './operators/operators';
import { interval } from './observable/from/timers/interval';
import { fromEventTarget } from './observable/from/dom/from-event-target';
import { fromFetch, IObservableFromFetchNotifications } from './observable/from/http/from-fetch';
import {
  fromIteratorWithNotifications, IObservableFromIteratorNotifications
} from './observable/from/from-iterable/from-iterator-with-notifications';
import { mapOperator } from './operators/map';
import { tuple } from './observable/from/__from-various';
import { NotificationsObserver } from './observer/notifications-observer';
import { combineLatest } from './observable/from/many/combine-latest';
import { domResize } from './observable/from/dom/dom-resize';
import { debounceOperator } from './operators/time-related/debounce';
import { domChange } from './observable/from/dom/dom-change';
import { ISource, Source } from './core/source';
import { ISubscription, Subscription } from './core/subscription';
import { toPromise } from './observable/to/to-promise';
import { fromArrayWithNotifications } from './observable/from/from-iterable/from-array-with-notifications';
import { IObservableReadBlobNotifications, readBlob } from './observable/from/dom/from-file-reader';
import { multicast } from './operators/multicast';

/** HELPERS **/


/** OBSERVABLE OBSERVER **/

interface ObservableObserver<GObserver extends Observer<any>, GObservable extends Observable<any>> {
  observer: GObserver;
  observable: GObservable;
}

interface BasicObservableObserver<GObserverValue, GObservableValue> extends ObservableObserver<Observer<GObserverValue>, Observable<GObservableValue>> {
}


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

// function unsubscribeOn<GNames extends string[]>(
//   subscription: IObservableUnsubscribeFunction,
//   names: GNames,
// ): void {
//
// }


/*---------------------------*/

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
  const observable = interval(1000)
    .pipe(
      mapOperator(() => Math.random()),
    );

  const unsubscribe = observable
    .subscribe((value: any) => {
      console.log('ping', value);
    });


  setTimeout(() => {
    unsubscribe();
  }, 2000);
}


async function debugObservable2() {
  fromFetch(noCORS(`https://www.w3.org/TR/PNG/iso_8859-1.txt`))
    .pipe(
      notificationOperator<IObservableFromFetchNotifications, 'next'>('next')
    )
    .subscribe((value: Response) => {
      console.log(value);
    });
}

async function debugObservable3() {
  fromIteratorWithNotifications([0, 1, 2, 3, 4][Symbol.iterator]())
    .subscribe((value: IObservableFromIteratorNotifications<number>) => {
      console.log(value);
    });
}


async function debugObservable4() {
  fromEventTarget<'click', MouseEvent>(window, 'click')
    .subscribe((event: MouseEvent) => {
      console.log('click', event);
    });
}

async function debugObservable5() {
  let i: number = 0;
  const obs1 = interval(1000)
    .pipe(
      mapOperator<void, number>(() => {
        return i++;
      })
    );

  let j: number = 0;
  const obs2 = fromEventTarget<'click', MouseEvent>(window, 'click')
    .pipe(
      mapOperator<Event, number>(() => {
        return j++;
      })
    );

  const unsubscribe = combineLatest(tuple(
    obs1,
    obs2
  ))
    .subscribe((values: readonly [number, number]) => {
      console.log('values', values);
    });


  setTimeout(() => {
    unsubscribe();
  }, 2000);
}

async function debugObservable6() {
  fromFetch(noCORS(`https://www.w3.org/TR/PNG/iso_8859-1.txt`))
    .subscribe(new NotificationsObserver({
      next: (response: Response) => {
        console.log(response);
      },
      complete: () => {
        console.log('done');
      }
    }));
}

async function debugObservable7() {
  domResize(document.body)
    .pipe(
      debounceOperator<void>(300),
    )
    .subscribe(() => {
      console.log('body resized');
    });

  domChange(document.body)
    .pipe(
      debounceOperator<void>(300),
    )
    .subscribe(() => {
      console.log('dom changed');
    });

  const unsubscribe = interval(1000)
    .subscribe(() => {
      document.body.appendChild(new Text(new Date().toString()));
    });

  setTimeout(unsubscribe, 5000);
}

/*--*/

type TNodeState = 'connected' | 'disconnected' | 'destroyed';

const NODE_STATE_OBSERVERS = new WeakMap<Node, ISource<TNodeState>>();

function nodeStateChange(node: Node): IObservable<TNodeState> {
  return new Observable<TNodeState>((observer: IObserver<TNodeState>): IObservableUnsubscribeFunction => {
    let source: ISource<TNodeState> = NODE_STATE_OBSERVERS.get(node) as ISource<TNodeState>;
    if (source === void 0) {
      source = new Source<TNodeState>();
    }
    return source.subscribe(observer);
  });
}


function setNodeState(node: Node, state: TNodeState): void {
  const source: ISource<TNodeState> | undefined = NODE_STATE_OBSERVERS.get(node);
  if (source !== void 0) {
    source.emit(state);
  }
}

type IDynamicNode<GNode extends Node, GValue> = GNode & IObserver<GValue>;
type IGenericDynamicNode = IDynamicNode<Node, any>;
type TInferDynamicNodeGValue<GDynamicNode extends IGenericDynamicNode> =
  GDynamicNode extends IDynamicNode<Node, infer GValue>
    ? GValue
    : never;

function linkDynamicNodeWithObservable<GDynamicNode extends IGenericDynamicNode>(
  node: GDynamicNode,
  observable: IObservable<TInferDynamicNodeGValue<GDynamicNode>>,
): GDynamicNode {
  type GValue = TInferDynamicNodeGValue<GDynamicNode>;

  const subscription: ISubscription<GValue> = new Subscription<GValue>(observable, node);

  const unsubscribeNodeStateChange = nodeStateChange(node)
    .subscribe((state: TNodeState) => {
      switch (state) {
        case 'connected':
          subscription.activate();
          break;
        case 'disconnected':
          subscription.deactivate();
          break;
        case 'destroyed':
          subscription.deactivate();
          unsubscribeNodeStateChange();
          break;
      }
    });

  return node;
}

async function debugObservable8() {

  interface IDynamicTextNode extends IDynamicNode<Text, string> {

  }

  class DynamicTextNode extends Text implements IDynamicTextNode {
    constructor() {
      super();
    }

    emit(value: string): void {
      this.data = value;
    }
  }

  const text = new DynamicTextNode();

  const observable = interval(1000)
    .pipe(
      mapOperator<void, string>(() => new Date().toString())
    );

  linkDynamicNodeWithObservable(text, observable);

  document.body.appendChild(text);
  setNodeState(text, 'connected');

  setTimeout(() => {
    setNodeState(text, 'destroyed');
  }, 5000)

  //
}


/*--*/

async function debugObservable9() {
  const result = await toPromise(fromArrayWithNotifications([1, 2, 3]));
  console.log(result);
}

async function debugObservable10() {
  const blob = new Blob([new Uint8Array([0, 1, 2, 3])]);
  type GValue = IObservableReadBlobNotifications<'array-buffer'>;
  const observable = readBlob(blob, 'array-buffer')
    .pipe(
      multicast<GValue>(),
    )
  observable
    .subscribe((notification: IObservableReadBlobNotifications<'array-buffer'>) => {
      console.log(notification);
    });

  console.log(await toPromise(observable));
}

/*----*/

export async function debugObservableV4() {
  // await debugObservable1();
  // await debugObservable2();
  // await debugObservable3();
  // await debugObservable4();
  // await debugObservable5();
  // await debugObservable6();
  // await debugObservable7();
  // await debugObservable8();
  // await debugObservable9();
  await debugObservable10();
  // await testSlicePerf();
}
