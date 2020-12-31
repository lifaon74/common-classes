import { ISubscribeFunction } from '../../../../types';
import { fromAsyncIterator, ISubscribeFunctionFromAsyncIteratorNotifications } from '../from-async-iterator/from-async-iterator';

export type ISubscribeFunctionFromAsyncIterableNotifications<GValue> = ISubscribeFunctionFromAsyncIteratorNotifications<GValue>;

export function fromAsyncIterable<GValue>(
  asyncIterable: AsyncIterable<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromAsyncIterableNotifications<GValue>> {
  return fromAsyncIterator<GValue>(asyncIterable[Symbol.asyncIterator]());
}
