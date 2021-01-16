## UnicastSource

```ts
interface IUnicastSource<GValue> extends ISource<GValue> {
  getObservers(): readonly IEmitFunction<GValue>[]; // readonly list of observers for this source
}
```

```ts
function createUnicastSource<GValue>(
  disableDuplicateSubscribeVerification: boolean = false,
): ISource<GValue>;
```

A *UnicastSource* is used to emit one value to multiple observers (*EmitFunction*).

This is equivalent to the *[Subject](https://rxjs-dev.firebaseapp.com/guide/subject)*.

### Examples

#### SubscribePipeFunction that re-emits only distinct received values

```ts
const source = createUnicastSource<number>();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.emit(1);
source.emit(2);
```

Output:

```text
value - A: 1
value - B: 1
value - A: 2
value - B: 2
```

##### RXJS equivalent

```ts
const source = new Subject<number>();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.next(1);
source.next(2);
```

