import { IEmitFunction, ISubscribeFunction } from '../../types';

export interface ISource<GValue> {
  readonly emit: IEmitFunction<GValue>;
  readonly subscribe: ISubscribeFunction<GValue>;
}

export type IGenericSource = ISource<any>;

