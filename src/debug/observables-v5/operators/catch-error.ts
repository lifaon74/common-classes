import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';
import { IGenericNotification } from '../misc/notifications/notification-interface';
import { IErrorNotification } from '../misc/notifications/built-in/error-notification';
import { asyncUnsubscribe } from '../misc/helpers/async-unsubscribe';
//
// // TODO: https://rxjs-dev.firebaseapp.com/api/operators/catchError
//
// export interface ICatchErrorOperatorOnError<GOut> {
//   (error: any): GOut;
// }
//
// export type ICatchErrorOperatorOut<GIn extends IGenericNotification, GOut> = Exclude<GIn, IErrorNotification> | GOut;
//
// export function catchErrorOperator<GIn extends IGenericNotification, GOut>(
//   onError: ICatchErrorOperatorOnError<GOut>
// ): IOperatorFunction<GIn, ICatchErrorOperatorOut<GIn, GOut>> {
//   type TOut = ICatchErrorOperatorOut<GIn, GOut>;
//   return mapOperator<GIn, TOut>((notification: GIn): TOut => {
//     return (notification.name === 'error')
//       ? onError(notification.value)
//       : notification as Exclude<GIn, IErrorNotification>;
//   });
// }

export interface ICatchErrorOperatorOnError<GOut> {
  (error: any): ISubscribeFunction<GOut>;
}

export type ICatchErrorOperatorOut<GIn extends IGenericNotification, GOut> = Exclude<GIn, IErrorNotification> | GOut;

export function catchErrorOperator<GIn extends IGenericNotification, GOut>(
  onError: ICatchErrorOperatorOnError<GOut>
): IOperatorFunction<GIn, ICatchErrorOperatorOut<GIn, GOut>> {
  type TOut = ICatchErrorOperatorOut<GIn, GOut>;

  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<TOut> => {
    return (emit: IEmitFunction<TOut>): IUnsubscribeFunction => {

      let onErrorUnsubscribe: IUnsubscribeFunction;

      const unsubscribe: IUnsubscribeFunction = subscribe((notification: GIn): void => {
        if (notification.name === 'error') {
          asyncUnsubscribe(() => unsubscribe);
          onErrorUnsubscribe = onError(notification.value)(emit);
        } else {
          emit(notification as Exclude<GIn, IErrorNotification>);
        }
      });

      return () => {
        unsubscribe();
        if (onErrorUnsubscribe !== void 0) {
          onErrorUnsubscribe();
        }
      };
    };
  };

  // return mapOperator<GIn, TOut>((notification: GIn): TOut => {
  //   return (notification.name === 'error')
  //     ? onError(notification.value)
  //     : notification as Exclude<GIn, IErrorNotification>;
  // });
}
