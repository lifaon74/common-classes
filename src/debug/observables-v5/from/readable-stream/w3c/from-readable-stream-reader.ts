import { ISubscribeFunction } from '../../../types';
import {
  fromAsyncIterator, ISubscribeFunctionFromAsyncIteratorNotifications
} from '../../iterable/async/from-async-iterator/from-async-iterator';

export type ISubscribeFunctionFromReadableStreamReaderNotifications<GValue> = ISubscribeFunctionFromAsyncIteratorNotifications<GValue>;

/**
 * WARN use with caution: it's possible that you subscribe twice to the same ReadableStreamReader, in this case the emitted values probably won't be what you expect
 */
export function fromReadableStreamReader<GValue>(
  reader: ReadableStreamReader<GValue>
): ISubscribeFunction<ISubscribeFunctionFromReadableStreamReaderNotifications<GValue>> {
  return fromAsyncIterator((async function * () {
    let result: ReadableStreamReadResult<GValue>;
    while (!(result = await reader.read()).done) {
      yield (result as ReadableStreamReadValueResult<GValue>).value;
    }
  })());
}
