import { IEmitFunction, ISubscribeFunction } from '../../types';

/**
 * A Source is used to emit one value to multiple observers
 */
export interface ISource<GValue> {
  getObservers(): readonly IEmitFunction<GValue>[]; // readonly list of observers for this source
  readonly emit: IEmitFunction<GValue>; // sends a value to all the observers
  readonly subscribe: ISubscribeFunction<GValue>; // registers an observer for this source
}

export type IGenericSource = ISource<any>;

