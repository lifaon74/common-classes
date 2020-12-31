import { ISubscribeFunction } from '../../types';
import {
  fromArrayWithNotifications, ISubscribeFunctionFromArrayNotifications
} from '../iterable/sync/from-array-with-notifications';

export type ISubscribeFunctionOfNotifications<GValue> = ISubscribeFunctionFromArrayNotifications<GValue>;

export function ofWithNotifications<GValue>(
  ...values: GValue[]
): ISubscribeFunction<ISubscribeFunctionOfNotifications<GValue>> {
  return fromArrayWithNotifications<GValue>(values);
}


