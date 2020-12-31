import { IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';
import { singleCall } from '../misc/helpers/single-call';
import {
  IGenericNotification, TInferGValueFromNotificationsUnionAndName, TInferNotificationGName
} from '../misc/notifications/notification-interface';

// type TOperatorReturn<GObservableIn extends Observable<any>, GObservableOut extends Observable<any>> = (observable: GObservableIn) => GObservableOut;
// type TOperator<GArgs extends any[], GObservableIn extends Observable<any>, GObservableOut extends Observable<any>> = (...args: GArgs) => TOperatorReturn<GObservableIn, GObservableOut>;


export interface IOperatorFunction<GIn, GOut> {
  (observable: IObservable<GIn>): IObservable<GOut>;
}

export type IGenericOperatorFunction = IOperatorFunction<any, any>;

// type TOperatorFunction<GIn, GOut> = (value: GIn) => GOut;
//
// type TPureOperatorFunction = (destination: TEmitFunction<any>, ...args: any[]) => TEmitFunction<>
//
// function pureMap<GIn, GOut>(destination: (data: GOut) => void, mapFunction: (value: GIn) => GOut): (data: GIn) => void  {
//   return (value: GIn) => destination(mapFunction(value));
// }
//
//
// class Operator<GIn, GOut> {
//   constructor() {
//   }
//
//   call(value: GIn): GOut {
//     throw 'TODO';
//   }
//
//   obs(value: IObservable<GIn>): IObservable<GOut> {
//     throw 'TODO';
//   }
// }


export function filterOperator<GIn>(filterFunction: (value: GIn) => boolean): IOperatorFunction<GIn, GIn>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => value is GIn): IOperatorFunction<GIn, GOut>;
export function filterOperator<GIn, GOut extends GIn>(filterFunction: (value: GIn) => boolean): IOperatorFunction<GIn, GOut> {
  return (observable: IObservable<GIn>): IObservable<GOut> => {
    return new Observable<GOut>((observer: IObserver<GOut>): IObservableUnsubscribeFunction => {
      return observable.subscribe((value: GIn): void => {
        if (filterFunction(value)) {
          observer.emit(value as GOut);
        }
      });
    });
  };
}





// function notificationOperator<GName extends string, GValue>(name: GName): OperatorFunction<INotification<GName, GValue>, INotification<GName, GValue>> {
//   type GNotificationsUnion = INotification<GName, GValue>;
//   type GNotification = INotification<GName, GValue>;
//   return filterOperator<GNotificationsUnion, GNotification>((notification: GNotificationsUnion): notification is GNotification => {
//     return (notification.getName() === name);
//   });
// }

/**
 * @deprecated replaced by NotificationsObserver
 */
export function notificationOperator<GNotificationsUnion extends IGenericNotification, GName extends TInferNotificationGName<GNotificationsUnion>>(
  name: GName,
): IOperatorFunction<GNotificationsUnion, TInferGValueFromNotificationsUnionAndName<GNotificationsUnion, GName>> {
  type GOut = TInferGValueFromNotificationsUnionAndName<GNotificationsUnion, GName>;
  return (observable: IObservable<GNotificationsUnion>): IObservable<GOut> => {
    return new Observable<GOut>((observer: IObserver<GOut>): IObservableUnsubscribeFunction => {
      return observable.subscribe((notification: GNotificationsUnion): void => {
        if (notification.name === name) {
          observer.emit(notification.value);
        }
      });
    });
  };
}

