// import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../types';
// import { INextNotification } from '../misc/notifications/built-in/next-notification';
// import { ICompleteNotification } from '../misc/notifications/built-in/complete-notification';
// import { IErrorNotification } from '../misc/notifications/built-in/error-notification';
//
// export type ICombineAllInSubscribeFunctionNotifications<GValue> =
//   INextNotification<GValue>
//   | ICompleteNotification
//   | IErrorNotification
//   ;
//
// export type ICombineAllInSubscribeFunction<GValue> = ISubscribeFunction<ICombineAllInSubscribeFunctionNotifications<GValue>>
//
// export function combineAllOperator<GIn, GOut>(): IOperatorFunction<ICombineAllInSubscribeFunction<GIn>, GOut> {
//   type GValueIn = ICombineAllInSubscribeFunction<GIn>;
//   return (subscribe: ISubscribeFunction<ICombineAllInSubscribeFunction<GIn>>): ISubscribeFunction<GOut> => {
//     return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
//       return subscribe((value: ICombineAllInSubscribeFunction<GIn>): void => {
//         emit(mapFunction(value));
//       });
//     };
//   };
// }
//
