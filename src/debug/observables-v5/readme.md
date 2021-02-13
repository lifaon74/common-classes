# Reactive

This library provides tools to generate and consume blazing fast Observables and Observers.

However, it is not RxJS: it's faster, smaller, and tries to be simpler.

[<img src="https://img.shields.io/badge/-tutorial-brightgreen?style=for-the-badge" />](./examples/tutorial.md)

Give it a try, and you'll love it !

If you're not familiar with the concept of Observables you may
check [the rxjs documentation](https://rxjs-dev.firebaseapp.com/guide/observable),
or [this excellent tutorial](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

The main purpose of Observables is to **react to changes**.

*Example: display mouse position until we click*

```ts
const subscribeToMouseMove = pipeSubscribeFunction(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapSubscribePipe<MouseEvent>((event: MouseEvent) => [event.clientX, event.clientY]),
]);

const unsubscribeOfMouseMove = subscribeToMouseMove(([x, y]) => {
  console.log(x, y);
});

const subscribeToMouseClick = fromEventTarget<'click', MouseEvent>(window, 'click');

const unsubscribeOfMouseClick= subscribeToMouseClick(() => {
  unsubscribeOfMouseMove();
  unsubscribeOfMouseClick();
});
```


Differences with RxJS:

- no classes: this choice allows blazing fast performances and very small bundle size. Indeed, creating a class with
  the `new` keyword is slow, and method names can't be mangled (minimized), where function calls are really well
  optimized by javascript engines. However, it has a minor cost: chaining operators or method calls are done through
  functions, which is a little less elegant (in terms of code readability).

- no `next`, `complete` and `error`: instead this lib use [notifications](./misc/notifications/notifications.md).
  In reality, not all *Observables* require to emit a final state. For example, the upper `interval` function,
  never reaches a `complete` state. It just sends numbers. Moreover, some *Observables* may want to emit more
  than this 3 *events*: we may imagine an XHR
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


## Select the right function

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
  
- an EventTarget: [fromEventTarget](subscribe-function/from/dom/from-event-target/from-event-target.md)
  
- a list of values: [of](subscribe-function/from/others/of/of.md)

- a promise
  - with a factory: [fromPromiseFactory](subscribe-function/from/promise/from-promise-factory/from-promise-factory.md)
  - without a factory ⚠: [fromPromise](subscribe-function/from/promise/from-promise/from-promise.md)

- a readable stream
  - [w3c streams](https://streams.spec.whatwg.org/#rs-class)
    - readable stream: [fromReadableStream](subscribe-function/from/readable-stream/w3c/from-readable-stream/from-readable-stream.md)
    - readable stream reader ⚠: [fromReadableStreamReader](subscribe-function/from/readable-stream/w3c/from-readable-stream-reader/from-readable-stream-reader.md)
  - nodejs: TODO

- an http request
  - using fetch: [fromFetch](subscribe-function/from/http/from-fetch/from-fetch.md)
  - using xhr: [fromXHR](subscribe-function/from/http/xhr/from-xhr/from-xhr.md)

- a blob (reads content): [readBlob](subscribe-function/from/dom/read-blob/read-blob.md)
  
- many subscribe functions. When any value is received:
  - re-emit it concurrently: [merge](subscribe-function/from/many/merge/merge.ts)
  - combine the values in an array and emit it: [combine-latest](subscribe-function/from/many/combine-latest/combine-latest.md)
  - combine the values in an array, runs a function with these values, and emit distinct returned
    values: [reactiveFunction](subscribe-function/from/many/reactive-function/reactive-function.md)
    - arithmetic:
      [reactiveAdd](subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-add.ts)
      [reactiveSubtract](subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-subtract.ts)
      [reactiveMultiply](subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-multiply.ts)
      [reactiveDivide](subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-divide.ts)
    - logic:
      [reactiveAnd](subscribe-function/from/many/reactive-function/built-in/logic/reactive-and.ts),
      [reactiveOr](subscribe-function/from/many/reactive-function/built-in/logic/reactive-or.ts),
      [reactiveNot](subscribe-function/from/many/reactive-function/built-in/logic/reactive-not.ts)
    - comparison:
      [reactiveEqual](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-equal.ts),
      [reactiveNotEqual](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-not-equal.ts),
      [reactiveGreaterThan](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than.ts),
      [reactiveGreaterThanOrEqual](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than-or-equal.ts),
      [reactiveLowerThan](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than.ts),
      [reactiveLowerThanOrEqual](subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than-or-equal.ts)
    - string:
      [reactiveTemplateString](subscribe-function/from/many/reactive-function/built-in/string/reactive-template-string.ts)

- time related
  - emits every 'ms': [interval](subscribe-function/from/time-related/interval/interval.md)
  - emits when idle time is available: [idle](subscribe-function/from/time-related/idle/idle.md)

#### convert a SubscribeFunction to

- a promise:
  - without notifications: [toPromise](subscribe-function/to/to-promise/to-promise.md)
  - with notifications:
    - with only the last value: [toPromiseLast](subscribe-function/to/to-promise/last/to-promise-last.md)
    - with every value: [toPromiseAll](subscribe-function/to/to-promise/all/to-promise-all.md)

#### create an SubscribePipeFunction which

- emits only distinct received values: [distinctSubscribePipe](subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe.ts)
- filters received values: [filterSubscribePipe](subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe.ts)
- transforms received values: [mapSubscribePipe](subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe.ts)
- reads received values, and re-emits them without transformations: [tapSubscribePipe](subscribe-function/subscribe-pipe/emit-pipe-related/tap-subscribe-pipe.ts)
- allows one SubscribeFunction to emit its values to many SubscribeFunction: [shareSubscribePipe](subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe.ts)

[comment]: <> (TODO better tree for source-related folder)


#### others

- chain many SubscribePipeFunctions: [pipeSubscribePipeFunctions](functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions.ts)
- chain many SubscribePipeFunctions with a
  SubscribeFunction: [pipeSubscribeFunction](functions/piping/pipe-subscribe-function/pipe-subscribe-function.ts)



