import {
  IDefaultNotificationsUnion, IEmitFunction, IGenericDefaultNotificationsUnion, IOperatorFunction, ISubscribeFunction,
  IUnsubscribeFunction
} from '../types';
import { toPromise } from '../to/to-promise';
import { throwError } from '../from/others/throw-error';
import { IErrorNotification } from '../../observables-v4/misc/notifications/build-in/error-notification';
import { ISubscribeFunctionOfNotifications, ofWithNotifications } from '../from/others/of-with-notifications';
import { IGenericNotification } from '../misc/notifications/notification-interface';


// TODO continue here

// WARN UNSTABLE


export interface IThenOperatorOnFulfilled<GInNextValue, GOut> {
  (value: GInNextValue): ISubscribeFunction<GOut>;
}

export interface IThenOperatorOnRejected<GOut> {
  (error: any): ISubscribeFunction<GOut>;
}


export function thenOperator<GInNextValue, GOut>(
  onFulfilled: IThenOperatorOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenOperatorOnRejected<GOut>,
): IOperatorFunction<IDefaultNotificationsUnion<GInNextValue> | IGenericNotification, GOut> {
  type GInNotificationsUnion = IDefaultNotificationsUnion<GInNextValue> | IGenericNotification;
  return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      let running: boolean = true;

      const controller: AbortController = new AbortController();
      const signal: AbortSignal = controller.signal;

      let childUnsubscribe: IUnsubscribeFunction;

      toPromise<GInNextValue>(subscribe, { signal })
        .then(
          (value: GInNextValue) => {
            if (running) {
              childUnsubscribe = onFulfilled(value)(emit);
            }
          },
          (error: any) => {
            if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
              childUnsubscribe = onRejected(error)(emit);
            }
          },
        );

      return (): void => {
        if (running) {
          running = false;
          controller.abort();
          if (childUnsubscribe !== void 0) {
            childUnsubscribe();
          }
        }
      };
    };
  };
}

export function fulfilledOperator<GInNextValue, GOut>(
  onFulfilled: IThenOperatorOnFulfilled<GInNextValue, GOut>,
): IOperatorFunction<IDefaultNotificationsUnion<GInNextValue> | IGenericNotification, GOut | IErrorNotification> {
  return thenOperator<GInNextValue, GOut | IErrorNotification>(
    onFulfilled,
    (error: any): ISubscribeFunction<IErrorNotification> => {
      return throwError(error);
    },
  );
}

export function rejectedOperator<GInNextValue, GOut>(
  onRejected: IThenOperatorOnRejected<GOut>,
): IOperatorFunction<IDefaultNotificationsUnion<GInNextValue>, GOut | ISubscribeFunctionOfNotifications<GInNextValue>> {
  return thenOperator<GInNextValue, GOut | ISubscribeFunctionOfNotifications<GInNextValue>>(
    (value: GInNextValue): ISubscribeFunction<ISubscribeFunctionOfNotifications<GInNextValue>> => {
      return ofWithNotifications<GInNextValue>(value);
    },
    onRejected,
  );
}

// V7
// export type TUndefinedOrNull = undefined | null;
// export type TOptionalType<GType> = GType | TUndefinedOrNull;
//
// export type TIsOptionalType<GType> =
//   GType extends TUndefinedOrNull
//     ? true
//     : false;
//
//
// // const a: ((null | undefined) extends (null) ? true : false); // false
// // const a: ((null | undefined) extends (null | undefined) ? true : false); // true
// // const a: (('a' | null | undefined) extends (null | undefined) ? true : false); // false
// // const a: ((undefined) extends (null | undefined) ? true : false); // true
//
// /** OnFulfilled **/
//
// export interface IThenOperatorOnFulfilled<GIn, GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (value: GIn): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
// export type IGenericThenOperatorOnFulfilled = IThenOperatorOnFulfilled<any, IGenericDefaultNotificationsUnion>;
//
// export type TInferThenOperatorOnFulfilledGIn<GOnFulfilled extends IGenericThenOperatorOnFulfilled> =
//   GOnFulfilled extends IThenOperatorOnFulfilled<infer GIn, IGenericDefaultNotificationsUnion>
//     ? GIn
//     : never;
//
// export type TInferThenOperatorOnFulfilledGOutNotificationsUnion<GOnFulfilled extends IGenericThenOperatorOnFulfilled> =
//   GOnFulfilled extends IThenOperatorOnFulfilled<infer GIn, IGenericDefaultNotificationsUnion>
//     ? GIn
//     : never;
//
// /*--*/
//
// export type TInferOptionalThenOperatorOnFulfilledGIn<GOnFulfilled extends TOptionalType<IGenericThenOperatorOnFulfilled>> =
//   GOnFulfilled extends TUndefinedOrNull
//     ? unknown
//     : TInferThenOperatorOnFulfilledGIn<Exclude<GOnFulfilled, TUndefinedOrNull>>;
//
// export type TInferOptionalThenOperatorOnFulfilledGInNotificationsUnion<GOnFulfilled extends TOptionalType<IGenericThenOperatorOnFulfilled>> =
//   IDefaultNotificationsUnion<TInferOptionalThenOperatorOnFulfilledGIn<GOnFulfilled>>;
//
//
// export type TInferOptionalThenOperatorOnFulfilledGOutNotificationsUnion<GOnFulfilled extends IGenericThenOperatorOnFulfilled> =
//   GOnFulfilled extends TUndefinedOrNull
//     ? ISubscribeFunctionOfNotifications<>
//     : TInferThenOperatorOnFulfilledGIn<Exclude<GOnFulfilled, TUndefinedOrNull>>;
//
//
// /** OnRejected **/
//
// export interface IThenOperatorOnRejected<GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (error: any): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
// export type IGenericThenOperatorOnRejected = IThenOperatorOnRejected<IGenericDefaultNotificationsUnion>;
//
//
//
// /*--*/
//
// export type TInferThenOperatorReturnedOperatorFunction< // generics
//   GOnFulfilled extends TOptionalType<IGenericThenOperatorOnFulfilled>,
//   GOnRejected extends TOptionalType<IGenericThenOperatorOnRejected>
//   //
// > =
//   IOperatorFunction<TInferOptionalThenOperatorOnFulfilledGIn<GOnFulfilled>, any>;
//
//
// /*--*/
//
//
//
// export function thenOperator< // generics
//   GOnFulfilled extends TOptionalType<IGenericThenOperatorOnFulfilled>,
//   GOnRejected extends TOptionalType<IGenericThenOperatorOnRejected>
//   //
//   >(
//   onFulfilled: GOnFulfilled,
//   onRejected: GOnFulfilled,
// ): TInferThenOperatorReturnedOperatorFunction<GOnFulfilled, GOnFulfilled> {
//   type GInNotificationsUnion = TInferOptionalThenOperatorOnFulfilledGInNotificationsUnion<GOnFulfilled>;
//   type GOutNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications<GIn>(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }


// // V6
// export interface IThenOperatorOnFulfilled<GIn, GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (value: GIn): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
// export type IThenOperatorOnFulfilledFromGInNotificationsUnion<// generics
//   GInNotificationsUnion extends IGenericDefaultNotificationsUnion,
//   GOutNotificationsUnion extends IGenericDefaultNotificationsUnion
//   //
//   > = IThenOperatorOnFulfilled<TInferDefaultNotificationsUnionGValue<GInNotificationsUnion>, GOutNotificationsUnion>;
//
// export interface IThenOperatorOnRejected<GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (error: any): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
//
// type A<// generics
//   GIn,
//   GOutNotificationsUnion extends IGenericDefaultNotificationsUnion
//   //
//   > =
//   GOutNotificationsUnion
//   | ISubscribeFunctionOfNotifications<GIn>
//   | IErrorNotification
//   ;
//
// export function thenOperator<// generics
//   GIn,
//   GOutNotificationsUnion extends IGenericDefaultNotificationsUnion
//   //
//   >(
//   onFulfilled?: IThenOperatorOnFulfilled<GIn, GOutNotificationsUnion> | null,
//   onRejected?: IThenOperatorOnRejected<GOutNotificationsUnion> | null,
// ): IOperatorFunction<IDefaultNotificationsUnion<GIn>, A<GIn, GOutNotificationsUnion>> {
//   type GInNotificationsUnion = IDefaultNotificationsUnion<GIn>;
//   type GOutNotificationsUnionA = A<GIn, GOutNotificationsUnion>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications<GIn>(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }

// // V5
// export function thenOperator<// generics
//   GInNotificationsUnion extends IGenericDefaultNotificationsUnion,
//   GOutNotificationsUnion extends IGenericDefaultNotificationsUnion
//   //
//   >(
//   onFulfilled?: IThenOperatorOnFulfilledFromGInNotificationsUnion<GInNotificationsUnion, GOutNotificationsUnion> | null,
//   onRejected?: IThenOperatorOnRejected<GOutNotificationsUnion> | null,
// ): IOperatorFunction<GInNotificationsUnion, GOutNotificationsUnion> {
//   type GIn = TInferDefaultNotificationsUnionGValue<GInNotificationsUnion>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }

// V4
// export interface IThenOperatorOnFulfilled<GIn, GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (value: GIn): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
// export type IGenericThenOperatorOnFulfilled = IThenOperatorOnFulfilled<any, IGenericDefaultNotificationsUnion>;
//
// export type TInferThenOperatorOnFulfilledGIn<GOnFulfilled extends IGenericThenOperatorOnFulfilled> =
//   GOnFulfilled extends IThenOperatorOnFulfilled<infer GIn, IGenericDefaultNotificationsUnion>
//     ? GIn
//     : never;
//
// export type TInferThenOperatorOnFulfilledGOutNotificationsUnion<GOnFulfilled extends IGenericThenOperatorOnFulfilled> =
//   GOnFulfilled extends IThenOperatorOnFulfilled<infer GIn, IGenericDefaultNotificationsUnion>
//     ? GIn
//     : never;
//
//
//
// export interface IThenOperatorOnRejected<GOutNotificationsUnion extends IGenericDefaultNotificationsUnion> {
//   (error: any): ISubscribeFunction<GOutNotificationsUnion>;
// }
//
// export type IGenericThenOperatorOnRejected = IThenOperatorOnRejected<IGenericDefaultNotificationsUnion>;
//
// export type TOptionalType<GType> = GType | null | undefined;
//
//
// export function thenOperator< // generics
//   GOnFulfilled extends TOptionalType<IGenericThenOperatorOnFulfilled>,
//   GOnRejected extends TOptionalType<IGenericThenOperatorOnRejected>
//   //
//   >(
//   onFulfilled: GOnFulfilled,
//   onRejected: GOnFulfilled,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GFulfilledValue | GRejectedValue>> {
//   type GInNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   type GOutNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }


// V3
// export type IThenOperatorInNotifications<GIn> = IDefaultNotificationsUnion<GIn>;
// export type IThenOperatorOutNotifications<GOut> = IDefaultNotificationsUnion<GOut>;
//
//
// export interface IThenOperatorOnFulfilled<GIn, GOut> {
//   (value: GIn): ISubscribeFunction<IDefaultNotificationsUnion<GOut>>;
// }
//
// export interface IThenOperatorOnRejected<GOut> {
//   (error: any): ISubscribeFunction<IDefaultNotificationsUnion<GOut>>;
// }
//
//
// export function thenOperator<GIn, GRejectedValue>(
//   onFulfilled: undefined | null,
//   onRejected: IThenOperatorOnRejected<GRejectedValue>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GRejectedValue>>;
//
// export function thenOperator<GIn, GFulfilledValue>(
//   onFulfilled: IThenOperatorOnFulfilled<GIn, GFulfilledValue>,
//   onRejected?: null,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GFulfilledValue>>;
//
// export function thenOperator<GIn, GFulfilledValue, GRejectedValue>(
//   onFulfilled: IThenOperatorOnFulfilled<GIn, GFulfilledValue>,
//   onRejected: IThenOperatorOnRejected<GRejectedValue>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GFulfilledValue | GRejectedValue>>;
//
// export function thenOperator<GIn, GFulfilledValue, GRejectedValue>(
//   onFulfilled?: IThenOperatorOnFulfilled<GIn, GFulfilledValue> | null,
//   onRejected?: IThenOperatorOnRejected<GRejectedValue> | null,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GFulfilledValue | GRejectedValue>> {
//   type GInNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   type GOutNotificationsUnion = IThenOperatorOutNotifications<GIn | GFulfilledValue | GRejectedValue>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }
//
// export function catchOperator<GIn, GRejectedValue>(
//   onRejected: IThenOperatorOnRejected<GRejectedValue>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GRejectedValue>> {
//   return thenOperator<GIn, GRejectedValue>(null, onRejected);
// }


// V2
// export function thenOperator<GIn, GOut>(
//   onFulfilled: undefined | null,
//   onRejected: IThenOperatorOnRejected<GOut>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GOut>>;
//
// export function thenOperator<GIn, GOut>(
//   onFulfilled: IThenOperatorOnFulfilled<GIn, GOut>,
//   onRejected?: null,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GOut>>;
//
// export function thenOperator<GIn, GOut>(
//   onFulfilled: IThenOperatorOnFulfilled<GIn, GOut>,
//   onRejected: IThenOperatorOnRejected<GOut>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GOut>>;
//
// export function thenOperator<GIn, GOut>(
//   onFulfilled?: IThenOperatorOnFulfilled<GIn, GOut> | null,
//   onRejected?: IThenOperatorOnRejected<GOut> | null,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GIn | GOut>> {
//   type GInNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   type GOutNotificationsUnion = IThenOperatorOutNotifications<GIn | GOut>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = (
//                 onFulfilled
//                   ? onFulfilled(value)
//                   : ofWithNotifications(value)
//               )(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = (
//                 onRejected
//                   ? onRejected(error)
//                   : throwError(error)
//               )(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }

// V1

// export function thenOperator<GIn, GOut>(
//   onFulfilled: IThenOperatorOnFulfilled<GIn, GOut>,
//   onRejected: IThenOperatorOnRejected<GOut>,
// ): IOperatorFunction<IThenOperatorInNotifications<GIn>, IThenOperatorOutNotifications<GOut>> {
//   type GInNotificationsUnion = IThenOperatorInNotifications<GIn>;
//   type GOutNotificationsUnion = IThenOperatorOutNotifications<GOut>;
//   return (subscribe: ISubscribeFunction<GInNotificationsUnion>): ISubscribeFunction<GOutNotificationsUnion> => {
//     return (emit: IEmitFunction<GOutNotificationsUnion>): IUnsubscribeFunction => {
//       let running: boolean = true;
//
//       const controller: AbortController = new AbortController();
//       const signal: AbortSignal = controller.signal;
//
//       let childUnsubscribe: IUnsubscribeFunction;
//
//       toPromise<GIn>(subscribe, { signal })
//         .then(
//           (value: GIn) => {
//             if (running) {
//               childUnsubscribe = onFulfilled(value)(emit);
//             }
//           },
//           (error: any) => {
//             if (running) { //  && !isAbortErrorWithSignal(error, signal) => not required
//               childUnsubscribe = onRejected(error)(emit);
//             }
//           },
//         );
//
//       return (): void => {
//         if (running) {
//           running = false;
//           controller.abort();
//           if (childUnsubscribe !== void 0) {
//             childUnsubscribe();
//           }
//         }
//       };
//     };
//   };
// }

// then<TResult1 = T, TResult2 = never>(
// onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
// onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
// ): Promise<TResult1 | TResult2>;

// const a = Promise.resolve().then();
