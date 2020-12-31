import {
  fromIteratorWithNotifications, ISubscribeFunctionFromIteratorNotifications
} from './from-iterator-with-notifications';
import { ISubscribeFunction } from '../../../types';

export type ISubscribeFunctionFromIterableNotifications<GValue> = ISubscribeFunctionFromIteratorNotifications<GValue>;

export function fromIterableWithNotifications<GValue>(
  iterable: Iterable<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromIterableNotifications<GValue>> {
  return fromIteratorWithNotifications<GValue>(iterable[Symbol.iterator]());
}
