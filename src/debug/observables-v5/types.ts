import { INextNotification } from './misc/notifications/built-in/next-notification';
import { ICompleteNotification } from './misc/notifications/built-in/complete-notification';
import { IErrorNotification } from './misc/notifications/built-in/error-notification';

/** EMIT **/

export interface IEmitFunction<GValue> {
  (value: GValue): void;
}

export type IGenericEmitFunction = IEmitFunction<any>;

export type TInferEmitFunctionGValue<GEmitFunction extends IGenericEmitFunction> =
  GEmitFunction extends IEmitFunction<infer GValue>
    ? GValue
    : never;


/** SUBSCRIBE **/

export interface ISubscribeFunction<GValue> {
  (emit: IEmitFunction<GValue>): IUnsubscribeFunction;
}

export interface IUnsubscribeFunction {
  (): void;
}


export type IGenericSubscribeFunction = ISubscribeFunction<any>;

export type TInferSubscribeFunctionGValue<GSubscribeFunction extends IGenericSubscribeFunction> =
  GSubscribeFunction extends ISubscribeFunction<infer GValue>
    ? GValue
    : never;


/** OPERATOR **/

export interface IOperatorFunction<GIn, GOut> {
  (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut>;
}

export type IGenericOperatorFunction = IOperatorFunction<any, any>;


/** OPERATOR **/

export type IDefaultNotificationsUnion<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

export type IGenericDefaultNotificationsUnion = IDefaultNotificationsUnion<any>;

// export type IDefaultNotificationsUnionForExtends =
//   IGenericDefaultNotificationsUnion
//   | IGenericNotification;
//
//
//
// export type TInferDefaultNotificationsUnionGValue<GNotificationsUnion extends IDefaultNotificationsUnionForExtends> =
//   GNotificationsUnion extends IDefaultNotificationsUnion<infer GValue>
//     ? GValue
//     : never;
//
//
// type B =
//   INextNotification<any>
//   | IAbortNotification
//   ;
//
// type A = TInferDefaultNotificationsUnionGValue<B>;
