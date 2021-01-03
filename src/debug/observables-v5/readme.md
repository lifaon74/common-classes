# Reactive

This library provides tools to generate and consume blazing fast Observables and Observers.

However, it is not RxJs: it's faster, smaller, and tries to be simpler.

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

const unsubscribe = interval(500)((value: number) => {
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

Differences with RxJs:

- no classes: this choice allows blazing fast performances and very small bundle size. Indeed, creating a class with
  the `new` keyword is slow, and method names can't be mangled (minimized), where function calls are really well
  optimized by javascript engines. However, it has a cost: chaining operators or method calls are done through
  functions, which is a little less elegant
  (in terms of code readability).

- no `next`, `complete` and `error`: instead this lib use [notifications](#notification). In reality, not all *
  Observables*
  require to emit a final state. For example, the upper `interval` function, never reaches a `complete` state. It just
  sends numbers. Moreover, some *Observables* may want to emit more than this 3 *events*: we may imagine an XHR
  Observable which emits an `upload-progress` and `download-progress` *events*.

- some operators may have a different behaviour or name

I chose deliberately to rename some of the RxJs's terms to do clearly the distinction between this library *components*
and the RxJs's *components*.

## Documentation

### SubscribeFunction

```ts
type ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>) => IUnsubscribeFunction;

type IUnsubscribeFunction = () => void;
```

A *SubscribeFunction* emits values when subscribed, and stops when unsubscribed.

This is equivalent to a *Push Source*, an *[Observable](https://rxjs-dev.firebaseapp.com/guide/observable)*
or somehow an *[EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)*.

*Example: SubscribeFunction which emits 'void' every 500ms when subscribed*

```ts
const subscribe: ISubscribeFunction<void> = (emit: IEmitFunction<void>): IUnsubscribeFunction => {
  const timer: any = setInterval(() => emit(), 500);
  return (): void => {
    clearInterval(timer);
  };
};
```

<details>
<summary>equivalent to</summary>
<p>

```ts
new Observable<void>((subscriber) => {
  const timer: any = setInterval(() => subscriber.next(), 500);
  return (): void => {
    clearInterval(timer);
  };
});
```

</p>
</details>

### EmitFunction

```ts
type IEmitFunction<GValue> = (value: GValue) => void;
```

An *EmitFunction* receives and consumes a value. This is equivalent to a *Push Destination* or
an *[Observer](https://rxjs-dev.firebaseapp.com/guide/observer)*.

*Example: EmitFunction which receives and logs numbers*

```ts
const emit: IEmitFunction<number> = (value: number): void => {
  console.log('received', value);
};
```

<details>
<summary>equivalent to</summary>
<p>

```ts
new Observer<number>((value: number) => {
  console.log('received', value);
});
```

</p>
</details>

### Operator

```ts
type IOperatorFunction<GIn, GOut> = (subscribe: ISubscribeFunction<GIn>) => ISubscribeFunction<GOut>;
```

An *OperatorFunction* takes one *SubscribeFunction* in input and returns another *SubscribeFunction* in output, whose
internal logic is tied up with the input *SubscribeFunction*. This is equivalent to
the *[Pipeable Operators](https://rxjs-dev.firebaseapp.com/guide/operators)* (ℹ️ only the pipeable ones).

*Example: OperatorFunction which transmits only distinct values received*

```ts
const operator = <GValue>(subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let previousValue: GValue;
    return subscribe((value: GValue): void => {
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}
```

**Note that creating your own operators** requires that you clear yourself any subscriptions to the input
*SubscribeFunction*.

### Piping

```ts
function pipeSubscribeFunction<GSubscribeFunction extends IGenericSubscribeFunction, GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>>(
  subscribe: GSubscribeFunction,
  fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions>;
```

The *pipeSubscribeFunction* is used to chain many *OperatorFunction*. This is equivalent to the `.pipe` methods of an
*Observable*.

*Example:*

```ts
const unsubscribe = pipeSubscribeFunction(interval(500), [
  mapOperator<void, number>(() => Math.random()), // transforms every 'void' received into a random number
  filterOperator<number>((value: number) => (value < 0.5)) // re-emits only values lower than 0.5
])((value: number) => {
  console.log('value', value);
});

setTimeout(unsubscribe, 2000);
```

<details>
<summary>equivalent to</summary>
<p>

```ts
interval(500)
  .pipe(
    map(() => Math.random()),
    filter((value: number) => (value < 0.5))
  )
  .subscribe((value: number) => {
    console.log('value', value);
  });
```

</p>
</details>

### Notification

```ts
interface INotification<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}
```

A *Notification* is used as a replacement of the `next`, `complete`and `error` *events*:
you emit directly a `INextNotification` instead of calling `subscriber.next()` for example.

To create a Notification, you may use a plain object `{ name, value }` or
use [the function](./misc/notifications/create-notification.ts):

```ts
function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue>;
```

Moreover, some pre-existing *Notifications* may be found in [misc/notifications/built-in](./misc/notifications/built-in)

*Example: creates a SubscribeFunction from a Promise*

```ts
export type ISubscribeFunctionFromPromiseNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

export function fromPromise<GValue>(
  promise: Promise<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = ISubscribeFunctionFromPromiseNotifications<GValue>;
  return (emit: IEmitFunction<GNotificationsUnion>): IUnsubscribeFunction => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            emit(createNextNotification<GValue>(value));
          }
          if (running) {
            emit(createCompleteNotification());
          }
        },
        (error: any) => {
          if (running) {
            emit(createErrorNotification<any>(error));
          }
        }
      );
    return (): void => {
      running = false;
    };
  };
}
```

*Example: consumes your notifications*

```ts
const subscribe = fromPromise(Promise.resolve(Math.random()));

subscribe((notification: ISubscribeFunctionFromPromiseNotifications<number>) => {
  switch (notification.name) {
    case 'next':
      console.log('next', notification.value);
      break;
    case 'complete':
      console.log('resolved');
      break;
    case 'error':
      console.log('rejected', notification.value);
      break;
  }
});
```

You may also use [notificationObserver](./misc/notifications/notification-observer.ts) if you prefer:

```ts
function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
): IEmitFunction<GNotificationsUnion>
```

```ts
subscribe(
  notificationObserver({
    next: (value: number) => {
      console.log('next', value);
    },
    complete: () => {
      console.log('resolved');
    },
    error: (error: any) => {
      console.log('rejected', error);
    },
  })
);
```

### Coming from RxJS ?

- Observable -> SubscribeFunction
- Subscription -> UnsubscribeFunction
- Observer -> EmitFunction
- Subject -> Source

## Choosing a function

⚠ : read carefully the documentation as it may lead to unwanted / unexpected behaviour

### I want to:

#### create a SubscribeFunction from

- an iterable
  - sync
    - array:
      - without notifications: [fromArray](./from/iterable/sync/from-array.ts)
      - with notifications: [fromArrayWithNotifications](./from/iterable/sync/from-array-with-notifications.ts)
    - iterable:
      - without notifications: [fromIterable](./from/iterable/sync/from-iterable.ts)
      - with notifications: [fromIterableWithNotifications](./from/iterable/sync/from-iterable-with-notifications.ts)
    - iterator ⚠️:
      - without notifications: [fromIterator](./from/iterable/sync/from-iterator.ts)
      - with notifications: [fromIteratorWithNotifications](./from/iterable/sync/from-iterator-with-notifications.ts)

  - async
    - async iterable: [fromAsyncIterable](from/iterable/async/from-async-iterable/from-async-iterable.md)
    - async iterator ⚠️: [fromAsyncIterator](from/iterable/async/from-async-iterator/from-async-iterator.md)

- a promise
  - with a factory: [fromPromiseFactory](./from/promise/from-promise-factory.ts)
  - without a factory ⚠: [fromPromise](./from/promise/from-promise.ts)

- a readable stream
  - [w3c streams](https://streams.spec.whatwg.org/#rs-class)
    - readable stream: [fromReadableStream](from/readable-stream/w3c/from-readable-stream.ts)
    - readable stream reader ⚠: [fromReadableStreamReader](from/readable-stream/w3c/from-readable-stream-reader.ts)
  - nodejs: TODO

- an http request
  - using fetch: [fromFetch](./from/http/from-fetch.ts)
  - using xhr: [fromXHR](./from/http/xhr/from-xhr.ts)

- a blob (reads content): [readBlob](./from/dom/read-blob.ts)

- many subscribe functions. When any value is received:
  - re-emit it concurrently: [merge](./from/many/merge.ts)
  - combine the values in an array and emit it: [merge](./from/many/combine-latest.ts)
  - combine the values in an array, runs a function with these values, and emit distinct returned
    values: [reactiveFunction](./from/many/reactive-function/reactive-function.ts)
    - arithmetic: [sum](./from/many/reactive-function/built-in/arithmetic/reactive-sum.ts)
    - logic: [and](./from/many/reactive-function/built-in/logic/reactive-and.ts),
      [or](./from/many/reactive-function/built-in/logic/reactive-or.ts),
      [not](./from/many/reactive-function/built-in/logic/reactive-not.ts)

- time related
  - emits every 'ms': [interval](./from/time-related/interval.ts)

#### convert a SubscribeFunction to

- a promise: [toPromise](./to/to-promise.ts)

#### create an OperatorFunction which

- emits only distinct received values: [distinctOperator](./operators/distinct.ts)
- filters received values: [filterOperator](./operators/filter.ts)
- transforms received values: [mapOperator](./operators/map.ts)
- allows one SubscribeFunction to emit its values to many
  SubscribeFunction: [multicastOperator](./operators/multicast.ts)

#### others

- chain many OperatorFunctions: [pipeSubscribeFunction](./misc/helpers/pipe-subscribe-function.ts)


