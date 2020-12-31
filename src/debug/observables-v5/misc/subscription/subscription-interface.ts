import { IEmitFunction, ISubscribeFunction } from '../../types';

export interface ISubscription<GValue> {
  readonly subscribeFunction: ISubscribeFunction<GValue>;
  readonly emitFunction: IEmitFunction<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}
