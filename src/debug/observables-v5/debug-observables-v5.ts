import { interval } from './from/time-related/interval';
import { pipeSubscribeFunction, pipeSubscribeFunctionSpread } from './misc/helpers/pipe-subscribe-function';
import { mapOperator } from './operators/map';
import { IUnsubscribeFunction } from './types';
import { filterOperator } from './operators/filter';
import { shareOperator } from './operators/share';
import { fromFetch, ISubscribeFunctionFromFetchNotifications } from './from/http/from-fetch';
import { notificationObserver } from './misc/notifications/notification-observer';
import { toPromise } from './to/to-promise';
import { ISubscribeFunctionReadBlobNotifications, readBlob } from './from/dom/read-blob';
import { fromXHR, ISubscribeFunctionFromXHRNotifications } from './from/http/xhr/from-xhr';
import { fromReadableStreamReader } from './from/readable-stream/w3c/from-readable-stream-reader';
import { fromAsyncIterable } from './from/iterable/async/from-async-iterable/from-async-iterable';
import { debounceOperator } from './operators/time-related/debounce';
import { reactiveSum } from './from/many/reactive-function/built-in/arithmetic/reactive-sum';
import { fromPromise } from './from/promise/from-promise';
import { fulfilledOperator, thenOperator } from './operators/then';
import { throwError } from './from/others/throw-error';
import { createNetworkErrorFromRequest } from './misc/errors/network-error/create-network-error';
import { expression } from './from/others/expression';
import { logOperator } from './operators/tap';
import { createSourceUsingFastArrayIterator, createSource } from './misc/source/create-source';
import { replaySharedOperator } from './operators/replay/replay';
import { replayLastSharedOperator } from './operators/replay/replay-last/replay-last';

function unsubscribeIn(unsubscribe: IUnsubscribeFunction, ms: number): void {
  setTimeout(unsubscribe, ms);
}

function noCORS(url: string): string {
  const _url: URL = new URL(`https://cors-anywhere.herokuapp.com/`);
  _url.pathname = url;
  return _url.href;
}


export function $timeout(ms: number): Promise<void> {
  return new Promise<void>((resolve: any) => {
    setTimeout(resolve, ms);
  });
}


/*------*/

async function debugObservable1() {
  const unsubscribe = pipeSubscribeFunctionSpread(
    interval(500),
    mapOperator<void, number>(() => Math.random()),
    filterOperator<number>((value: number) => (value < 0.5))
  )((value: number) => {
    console.log('value', value);
  });

  unsubscribeIn(unsubscribe, 2000);
}

async function debugObservable2() {
  const subscribe = pipeSubscribeFunction(interval(500), [
    logOperator<void>('timer'),
    mapOperator<void, number>(() => Math.random()),
    shareOperator<number>(),
  ]);

  const unsub1 = subscribe(((value: number) => {
    console.log('value1', value);
  }));

  const unsub2 = subscribe(((value: number) => {
    console.log('value2', value);
  }));

  unsubscribeIn(unsub1, 2000);
  unsubscribeIn(unsub2, 4000);
}

async function debugObservable3() {
  const subscribe = pipeSubscribeFunction(fromFetch(noCORS(`https://www.w3.org/TR/PNG/iso_8859-1.txt`)), [
    shareOperator<ISubscribeFunctionFromFetchNotifications>()
  ]);

  subscribe(
    notificationObserver({
      next: (response: Response) => {
        console.log(response);
      },
      complete: () => {
        console.log('done');
      }
    })
  );

  console.log(await toPromise(subscribe));
}

async function debugObservable4() {
  const blob = new Blob([new Uint8Array([0, 1, 2, 3])]);
  type GNotifications = ISubscribeFunctionReadBlobNotifications<'array-buffer'>;
  const subscribe = pipeSubscribeFunctionSpread(
    readBlob(blob, 'array-buffer'),
    shareOperator<GNotifications>()
  );

  subscribe((notification: GNotifications) => {
    console.log(notification);
  });

  console.log(await toPromise(subscribe));
}

async function debugObservable5() {
  fromAsyncIterable((async function * generator() {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
    // throw new Error('failed');
  })())((notification: any) => {
    console.log(notification);
  });
}

async function debugObservable6() {
  const response = await fetch(`https://file-examples-com.github.io/uploads/2017/02/zip_10MB.zip`);

  fromReadableStreamReader((response.body as ReadableStream).getReader())((notification: any) => {
    console.log(notification);
  });
}

async function debugObservable7() {
  // https://reqres.in/
  // https://file-examples.com/index.php/text-files-and-archives-download/

  // const request = new Request(noCORS(`https://www.w3.org/TR/PNG/iso_8859-1.txt`)); // basic get
  // const request = new Request(`https://reqres.in/api/users`, { // 100MB upload
  //   method: 'POST',
  //   body: new Blob([new Uint8Array(1e8)]) // 100MB
  // });

  const request = new Request(`https://file-examples-com.github.io/uploads/2017/02/zip_10MB.zip`); // 10MB download

  const subscribe = pipeSubscribeFunctionSpread(
    fromXHR(request),
    shareOperator<ISubscribeFunctionFromXHRNotifications>()
  );

  subscribe((notification: ISubscribeFunctionFromXHRNotifications) => {
    console.log(notification);
  });

  subscribe(
    notificationObserver({
      next: (response: Response) => {
        let size: number = 0;
        const subscribe = fromReadableStreamReader((response.body as ReadableStream).getReader());
        subscribe(
          notificationObserver({
            next: (chunk: Uint8Array) => {
              size += chunk.byteLength;
            },
            complete: () => {
              console.log('size', size);
            },
          })
        );
      }
    })
  );

  console.log(await toPromise(subscribe));
}

async function debugObservable8() {
  const sub1 = pipeSubscribeFunction(interval(500), [
    mapOperator(() => Math.random()),
  ]);
  const sub2 = pipeSubscribeFunctionSpread(
    interval(500),
    mapOperator(() => Math.random())
  );

  const subscribe = pipeSubscribeFunctionSpread(
    reactiveSum([sub1, sub2]),
    debounceOperator<number>(0),
  );

  const unsubscribe = subscribe((value: number) => {
    console.log(value);
  });

  await $timeout(2000);
  unsubscribe();
}

async function debugObservable9() {
  // const request = new Request(`https://file-examples-com.github.io/uploads/2017/02/zip_10MB.zip`); // 10MB download
  const request = new Request(`https://fakedomain.com`);

  const subscribe = pipeSubscribeFunction(fromFetch(request), [
    thenOperator(
      (response: Response) => {
        if (response.ok) {
          return fromPromise(response.blob());
        } else {
          return throwError(createNetworkErrorFromRequest(request));
        }
      },
      (error: any) => {
        console.log('caught error', error);
        return throwError(createNetworkErrorFromRequest(request));
      }
    ),
    fulfilledOperator((blob: Blob) => {
      return readBlob(blob, 'array-buffer');
    }),
    fulfilledOperator((data: ArrayBuffer) => {
      return throwError(createNetworkErrorFromRequest(request));
    }),
    // rejectedOperator<Blob>((error: any) => {
    //   console.log('error catched');
    //   return throwError(error);
    // }),
    // multicastOperator<IThenOperatorOutNotifications<Blob>>(),
  ]);

  subscribe((value: any) => {
    console.log(value);
  });

  // subscribe(
  //   notificationObserver({
  //     next: (response: Blob) => {
  //       console.log(response);
  //     },
  //     complete: () => {
  //       console.log('done');
  //     }
  //   })
  // );

  // subscribe((notification: DN) => {
  //   console.log(notification);
  // });
}


async function debugObservable10() {
  const obj: any = { a: 'a', b: { c: 'c' } };
  type TValue = string | undefined;

  const subscribe = pipeSubscribeFunction(expression<TValue>((): TValue => obj.b?.c), [
    shareOperator<TValue>()
  ]);

  const unsubscribe = subscribe((value: TValue): void => {
    console.log(value);
  });

  await $timeout(1000);
  obj.b.c = 'd';

  await $timeout(1000);
  obj.b = null;

  await $timeout(1000);
  unsubscribe();
}

async function debugObservable11() {

  const source = createSource<number>();

  const subscribe = pipeSubscribeFunction(source.subscribe, [
    // replayLastSharedOperator<number>()
    replaySharedOperator<number>(3)
  ]);

  const unsubscribe1 = subscribe((value: number): void => {
    console.log('subscription 1', value);
  });

  for (let i = 0; i < 10; i++) {
    source.emit(i);
  }

  const unsubscribe2 = subscribe((value: number): void => {
    console.log('subscription 2', value);
  });

  // source.emit(-1);

  unsubscribe1();
  unsubscribe2();
}


async function debugSource1() {
  const source = createSource<void>();

  const unsub1 = source.subscribe(() => {
    console.log('1');
    unsub2();
    // unsub1();
  });

  const unsub2 = source.subscribe(() => {
    console.log('2');
  });

  // const unsub3 = source.subscribe(() => {
  //   console.log('3');
  // });

  source.emit();
}

async function debugSourcePerf1() {
  const test1 = () => {
    // same time to subscribe => 2845.319091796875ms
    // const source = createSourceUsingFastArrayIterator<void>();
    const source = createSource<void>({ disableDuplicateSubscribeVerification: true });
    console.time('perf');
    let j: number = 0;
    for (let i = 0; i < 1e5; i++) {
      source.subscribe(() => { j++; });
    }
    source.emit();
    console.timeEnd('perf');
    console.log(j);
  };

  const test2 = () => {
    // 816.326171875 vs 577.4970703125
    // const source = createSourceUsingFastArrayIterator<void>();
    const source = createSource<void>({ disableDuplicateSubscribeVerification: true });
    for (let i = 0; i < 1e6; i++) {
      source.subscribe(() => { j++; });
    }

    console.time('perf');
    let j: number = 0;
    for (let i = 0; i < 1e2; i++) {
      source.emit();
    }
    console.timeEnd('perf');
    console.log(j);
  };

  // test1();
  test2();
}


/*----*/


export async function debugObservableV5() {
  // await test();

  // await debugObservable1();
  // await debugObservable2();
  // await debugObservable3();
  // await debugObservable4();
  // await debugObservable5();
  // await debugObservable6();
  // await debugObservable7();
  // await debugObservable8();
  // await debugObservable9();
  // await debugObservable10();
  await debugObservable11();

  // await debugSource1();
  // await debugSourcePerf1();

  // await debugReactiveDOM();
}
