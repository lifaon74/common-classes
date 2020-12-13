import { IObservable, IObservableUnsubscribeFunction, Observable } from '../core/observable';
import { IObserver } from '../core/observer';
import { TInferGValueFromNotificationsUnionAndName } from '../observer/dispatch';
import { singleCall } from '../misc/helpers/single-call';
import { IGenericNotification, TInferNotificationGName } from '../notifications/notification-interface';

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


export function mapOperator<GIn, GOut>(mapFunction: (value: GIn) => GOut): IOperatorFunction<GIn, GOut> {
  return (observable: IObservable<GIn>): IObservable<GOut> => {
    return new Observable<GOut>((observer: IObserver<GOut>): IObservableUnsubscribeFunction => {
      return observable.subscribe((value: GIn): void => {
        observer.emit(mapFunction(value));
      });
    });
  };
}

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

export function delayOperator<GValue>(ms: number): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      const timers: Set<any> = new Set<any>();
      const unsubscribe: IObservableUnsubscribeFunction = observable.subscribe((value: GValue): void => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          observer.emit(value);
        }, ms);
        timers.add(timer);
      });

      return (): void => {
        unsubscribe();
        timers.forEach((timer: any) => {
          clearTimeout(timer);
        });
      };
    });
  };
}

export function multicast<GValue>(): IOperatorFunction<GValue, GValue> {
  return (observable: IObservable<GValue>): IObservable<GValue> => {
    let observers: IObserver<GValue>[] = [];
    let unsubscribe: IObservableUnsubscribeFunction | null = null;
    let isDispatching: boolean = false;
    return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      if (observers.includes(observer)) {
        throw new Error(`Already subscribed to this Observable`);
      } else {
        if (isDispatching) {
          observers = observers.slice();
        }
        observers.push(observer);
        if (unsubscribe === null) {
          unsubscribe = observable.subscribe((value: GValue): void => {
            if (isDispatching) {
              throw new Error(`The Observable is already dispatching a value. You probably created a recursive loop.`);
            } else {
              isDispatching = true;
              const _observers: IObserver<GValue>[] = observers;
              const lengthMinusOne: number = _observers.length - 1;
              for (let i = 0; i < lengthMinusOne; i++) {
                _observers[i].emit(value);
              }
              isDispatching = false;
              _observers[lengthMinusOne].emit(value);
            }
          });
        }
        return singleCall(() => {
          if (isDispatching) {
            observers = observers.slice();
          }
          observers.splice(observers.indexOf(observer), 1);
          if (observers.length === 0) {
            (unsubscribe as IObservableUnsubscribeFunction)();
            unsubscribe = null;
          }
        });
      }
    });
  };


  // return (observable: IObservable<GValue>): IObservable<GValue> => {
  //   const observers: IObserver<GValue>[] = [];
  //   // let observers: IObserver<GValue>[] = [];
  //   let unsubscribe: IObservableUnsubscribeFunction | null;
  //   let isDispatching: boolean = false;
  //   return new Observable<GValue>((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
  //     if (observers.includes(observer)) {
  //       throw new Error(`Already subscribed to this Observable`);
  //     } else {
  //       observers.push(observer);
  //       if (unsubscribe === null) {
  //         unsubscribe = observable.subscribe((value: GValue): void => {
  //           for (let i = 0, l = observers.length; i < l; i++) {
  //             observers[i].emit(value);
  //           }
  //         });
  //       }
  //       return singleCall(() => {
  //         observers.slice(observers.indexOf(observer), 1);
  //         if (observers.length === 0) {
  //           (unsubscribe as ObservableUnsubscribeFunction)();
  //           unsubscribe = null;
  //         }
  //       });
  //     }
  //   });
  // };
}

// function notificationOperator<GName extends string, GValue>(name: GName): OperatorFunction<INotification<GName, GValue>, INotification<GName, GValue>> {
//   type GNotificationsUnion = INotification<GName, GValue>;
//   type GNotification = INotification<GName, GValue>;
//   return filterOperator<GNotificationsUnion, GNotification>((notification: GNotificationsUnion): notification is GNotification => {
//     return (notification.getName() === name);
//   });
// }

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

