import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';

export interface ISubscription<GValue> {
  readonly subscribeFunction: ISubscribeFunction<GValue>;
  readonly emitFunction: IEmitFunction<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}
