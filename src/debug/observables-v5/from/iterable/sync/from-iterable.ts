import { ISubscribeFunction } from '../../../types';
import { fromIterator } from './from-iterator';

export function fromIterable<GValue>(
  iterable: Iterable<GValue>,
): ISubscribeFunction<GValue> {
  return fromIterator<GValue>(iterable[Symbol.iterator]());
}
