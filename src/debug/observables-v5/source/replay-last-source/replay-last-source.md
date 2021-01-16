## ReplayLastSource

```ts
interface IReplayLastSource<GValue> extends IMulticastSource<GValue> {
  getValue(): GValue;
}
```

```ts
function createReplayLastSource<GValue>(
  value: GValue,
): IReplayLastSource<GValue>;
```

A *ReplayLastSource* is used to store a value and emit it each time we subscribe to it.

This is equivalent to the *[BehaviorSubject](https://rxjs-dev.firebaseapp.com/guide/subject)*.

### Examples

#### ReplayLastSource

```ts
const source = createReplayLastSource<number>(0);

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.emit(1);
source.emit(2);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.emit(3);
```

Output:

```text
value - A: 0
value - A: 1
value - A: 2
value - B: 2
value - A: 3
value - B: 3
```

##### RXJS equivalent

```ts
const source = new BehaviorSubject(0);

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.next(1);
source.next(2);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.next(3);
```

