# Reactive

This library provides tools to generate and consume blazing fast Observables and Observers.

However, it is not RxJS: it's faster, smaller, and tries to be simpler.

If you're not familiar with the concept of Observables you may
check [the rxjs documentation](https://rxjs-dev.firebaseapp.com/guide/observable),
or [this excellent tutorial](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

The main purpose of Observables is to **react to changes**.

*Example:*

```ts


function interval(
  period: number,
): ISubscribeFunction<number> {
  return (emit: IEmitFunction<number>): IUnsubscribeFunction => {
    console.log('interval started');
    let count: number = 0;
    const timer: any = setInterval(() => emit(count++), period);
    return (): void => {
      clearInterval(timer);
      console.log('interval stopped');
    };
  };
}

const subscribe = interval(500);

const unsubscribe = subscribe((value: number) => {
  console.log('tick', value);
});

setTimeout(unsubscribe, 1100);
```

Output:

```text
interval started
tick 0
tick 1
interval stopped
```

Differences with RxJS:

- no classes: this choice allows blazing fast performances and very small bundle size. Indeed, creating a class with
  the `new` keyword is slow, and method names can't be mangled (minimized), where function calls are really well
  optimized by javascript engines. However, it has a minor cost: chaining operators or method calls are done through
  functions, which is a little less elegant (in terms of code readability).

- no `next`, `complete` and `error`: instead this lib use [notifications](#notification). In reality, not all *Observables*
  require to emit a final state. For example, the upper `interval` function, never reaches a `complete` state. It just
  sends numbers. Moreover, some *Observables* may want to emit more than this 3 *events*: we may imagine an XHR
  Observable which emits an `upload-progress` and `download-progress` *events*.

- some operators may have a different behaviour or name

I chose deliberately to rename some of the RxJS's terms to do clearly the distinction between this library *components*
and the RxJS's *components*.

## Documentation

- [SubscribeFunction](./types/subscribe-function/subscribe-function.md) (ak: Observable)
- [EmitFunction](./types/emit-function/emit-function.md) (ak: Observer)
- [SubscribePipeFunction](./types/subscribe-pipe-function/subscribe-pipe-function.md) (ak: Pipeable Operator)
- [pipeSubscribeFunction](./functions/piping/pipe-subscribe-function/pipe-subscribe-function.md) (ak: Observable.pipe)
- [pipeSubscribePipeFunctions](./functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions.md) (ak: pipe function)
- [Notification](./misc/notifications/notifications.md) (ak: *next*, *complete* and *error*)
- [MulticastSource](./source/multicast-source/multicast-source.md) (ak: Subject)
- [ReplayLastSource](./source/replay-last-source/replay-last-source.md) (ak: BehaviorSubject)


## Choosing a function

⚠ : read carefully the documentation as it may lead to unwanted / unexpected behaviour

### I want to:

#### create a SubscribeFunction from

- an iterable
  - sync
    - array:
      - without notifications: [fromArray](subscribe-function/from/iterable/sync/from-array/from-array.md)
      - with notifications: [fromArrayWithNotifications](subscribe-function/from/iterable/sync/from-array/with-notifications/from-array-with-notifications.md)
    - iterable:
      - without notifications: [fromIterable](subscribe-function/from/iterable/sync/from-iterable/from-iterable.md)
      - with notifications: [fromIterableWithNotifications](subscribe-function/from/iterable/sync/from-iterable/with-notifications/from-iterable-with-notifications.md)
    - iterator ⚠️:
      - without notifications: [fromIterator](subscribe-function/from/iterable/sync/from-iterator/from-iterator.md)
      - with notifications: [fromIteratorWithNotifications](subscribe-function/from/iterable/sync/from-iterator/with-notifications/from-iterator-with-notifications.md)

  - async
    - async iterable: [fromAsyncIterable](subscribe-function/from/iterable/async/from-async-iterable/from-async-iterable.md)
    - async iterator ⚠️: [fromAsyncIterator](subscribe-function/from/iterable/async/from-async-iterator/from-async-iterator.md)

- a promise
  - with a factory: [fromPromiseFactory](subscribe-function/from/promise/from-promise-factory/from-promise-factory.md)
  - without a factory ⚠: [fromPromise](subscribe-function/from/promise/from-promise/from-promise.md)

- a readable stream
  - [w3c streams](https://streams.spec.whatwg.org/#rs-class)
    - readable stream: [fromReadableStream](subscribe-function/from/readable-stream/w3c/from-readable-stream/from-readable-stream.ts)
    - readable stream reader ⚠: [fromReadableStreamReader](subscribe-function/from/readable-stream/w3c/from-readable-stream-reader.ts)
  - nodejs: TODO

- an http request
  - using fetch: [fromFetch](subscribe-function/from/http/from-fetch/from-fetch.md)
  - using xhr: [fromXHR](subscribe-function/from/http/xhr/from-xhr/from-xhr.md)

- a blob (reads content): [readBlob](subscribe-function/from/dom/read-blob/read-blob.md)

- many subscribe functions. When any value is received:
  - re-emit it concurrently: [merge](subscribe-function/from/many/merge.ts)
  - combine the values in an array and emit it: [combine-latest](subscribe-function/from/many/combine-latest.ts)
  - combine the values in an array, runs a function with these values, and emit distinct returned
    values: [reactiveFunction](subscribe-function/from/many/reactive-function/reactive-function.ts)
    - arithmetic:
      [sum](subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-sum.ts)
    - logic:
      [and](subscribe-function/from/many/reactive-function/built-in/logic/reactive-and.ts),
      [or](subscribe-function/from/many/reactive-function/built-in/logic/reactive-or.ts),
      [not](subscribe-function/from/many/reactive-function/built-in/logic/reactive-not.ts)

- time related
  - emits every 'ms': [interval](subscribe-function/from/time-related/interval/interval.md)
  - emits when idle time is available: [idle](subscribe-function/from/time-related/idle/idle.md)

#### convert a SubscribeFunction to

- a promise: [toPromise](subscribe-function/to/to-promise/to-promise.ts)

#### create an OperatorFunction which

- emits only distinct received values: [distinctOperator](__operators/pipe-based/distinct-operator.ts)
- filters received values: [filterOperator](__operators/filter.ts)
- transforms received values: [mapOperator](__operators/pipe-based/map-operator.ts)
- reads received values, and re-emits them without transformations: [tapOperator](__operators/tap.ts)
- allows one SubscribeFunction to emit its values to many SubscribeFunction: [shareOperator](__operators/share.ts)
- re-emit last received values:
  - last value only: [replayLastSharedOperator](__operators/replay/replay-last/replay-last.ts)
  - last N values: [replaySharedOperator](__operators/replay/replay.ts)

#### others

- chain many OperatorFunctions: [pipeOperatorFunctions](functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions.ts)
- chain many OperatorFunctions with a
  SubscribeFunction: [pipeSubscribeFunction](functions/piping/pipe-subscribe-function/pipe-subscribe-function.ts)



