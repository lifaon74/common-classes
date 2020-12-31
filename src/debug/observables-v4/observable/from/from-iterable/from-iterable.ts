import { IObservable } from '../../../core/observable';
import { fromIterator } from './from-iterator';

export function fromIterable<GValue>(iterable: Iterable<GValue>): IObservable<GValue> {
  return fromIterator<GValue>(iterable[Symbol.iterator]());
}
