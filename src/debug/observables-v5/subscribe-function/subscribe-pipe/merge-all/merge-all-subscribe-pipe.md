## mergeAllSubscribePipe

```ts
function mergeAllSubscribePipe<GValue>(): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue>
```

This SubscribePipe subscribes to a SubscribeFunction that emits SubscribeFunctions, also known as a higher-order SubscribeFunction.
Each time it observes one of these emitted inner SubscribeFunction, it subscribes to that and delivers all the values from the inner SubscribeFunction on the output SubscribeFunction.

This is related to [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll)

### Examples

TODO

#### Title

```ts
```

Output:

```text
```

