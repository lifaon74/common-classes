
import { ISubscription } from './subscription-interface';
import { IEmitFunction } from '../../types/emit-function/emit-function';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function';


export class Subscription<GValue> implements ISubscription<GValue> {
  public readonly subscribeFunction: ISubscribeFunction<GValue>;
  public readonly emitFunction: IEmitFunction<GValue>;

  protected _unsubscribe: IUnsubscribeFunction | null;

  constructor(
    subscribeFunction: ISubscribeFunction<GValue>,
    emitFunction: IEmitFunction<GValue>,
  ) {
    this.subscribeFunction = subscribeFunction;
    this.emitFunction = emitFunction;
    this._unsubscribe = null;
  }

  isActivated(): boolean {
    return this._unsubscribe !== null;
  }

  activate(): this {
    if (this._unsubscribe === null) {
      this._unsubscribe = this.subscribeFunction(this.emitFunction);
    }
    return this;
  }

  deactivate(): this {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
    }
    return this;
  }

  toggle(activate: boolean = !this.isActivated()): this {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}


export interface ISubscriptionManager<GValue> {
  subscriptions: Subscription<GValue>;

  activateAll(): this;

  deactivateAll(): this;
}

