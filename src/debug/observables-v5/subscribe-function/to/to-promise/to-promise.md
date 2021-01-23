## toPromise

```ts
function toPromise<GValue>(
  subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
  options?: ISubscribeFunctionToPromiseOptions
): Promise<GValue>
```

```ts
interface ISubscribeFunctionToPromiseOptions {
  signal?: AbortSignal;
}

type ISubscribeFunctionToPromiseNotifications<GValue> =
  IDefaultNotificationsUnion<GValue>
  | IGenericNotification
  ;
```

Converts a SubscribeFunction into a Promise.

The SubscribeFunction must emit the following Notifications:

- `next`: the value to resolve the promise with
- `complete`: resolves the promise with the last `next` value
- `error`: rejects the promise with the received error

You may provide a `ISubscribeFunctionToPromiseOptions`, which may be used to force an abort from an external
AbortSignal: this is useful if you want to abort any pending work and unsubscribe from the provided SubscribeFunction,
before it completes. If this signal is aborted, the promise is rejected with an `AbortError`.

### Examples

#### Simple http request 

```ts
toPromise(fromFetch('https://some-url.site'))
  .then((response: Response) => {
    console.log(response.statusText);
  });
```

#### Simple http request aborted

```ts
const controller = new AbortController();

toPromise(fromFetch('https://some-url.site'), { signal: controller.signal })
  .then((response: Response) => {
    console.log(response.statusText);
  });

controller.abort(); // the request is properly aborted
```

