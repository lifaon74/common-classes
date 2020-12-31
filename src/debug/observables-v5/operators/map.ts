import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';

export function mapOperator<GIn, GOut>(mapFunction: (value: GIn) => GOut): IOperatorFunction<GIn, GOut> {
  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      return subscribe((value: GIn): void => {
        emit(mapFunction(value));
      });
    };
  };
}


export type TMapNotifications<GNotificationsUnion, GExcludedNotificationsUnion, GNewNotificationsUnion> =
  Exclude<GNotificationsUnion, GExcludedNotificationsUnion>
  | GNewNotificationsUnion;
