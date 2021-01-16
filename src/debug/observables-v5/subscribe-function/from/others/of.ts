import { fromArray } from '../iterable/sync/from-array';
import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function';


export function of<GValue>(
  ...values: GValue[]
): ISubscribeFunction<GValue> {
  return fromArray<GValue>(values);
}


