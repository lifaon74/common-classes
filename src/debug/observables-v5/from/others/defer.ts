import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';


export interface IDefferFactoryFunction<GValue> {
  (): ISubscribeFunction<GValue>;
}

/**
 * Creates an SubscribeFunction that, on subscribe, calls a SubscribeFunction factory to make a SubscribeFunction for each new Subscription.
 */
export function defer<GValue>(
  factory: IDefferFactoryFunction<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    return factory()(emit);
  };
}


