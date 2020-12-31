import { ISubscribeFunction } from '../../types';
import { fromArray } from '../iterable/sync/from-array';


export function of<GValue>(
  ...values: GValue[]
): ISubscribeFunction<GValue> {
  return fromArray<GValue>(values);
}


