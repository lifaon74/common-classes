import { IEmitFunction, IObserver, Observer } from './observer';
import { PipeConstraint, pipeNow, PipeNowReturn } from '../functional/pipe';
import { IGenericOperatorFunction } from '../operators/operators';

export interface IObservableSubscribeFunction<GValue> {
  (observer: IObserver<GValue>): IObservableUnsubscribeFunction;
}

export interface IObservableUnsubscribeFunction {
  (): void;
}

export type IObservablePipeConstraint<GValue, GFunctions extends IGenericOperatorFunction[]> = PipeConstraint<GFunctions, IObservable<GValue>, IGenericOperatorFunction>;

export type IObservablePipeReturn<GValue, GFunctions extends IGenericOperatorFunction[]> = PipeNowReturn<IObservable<GValue>, GFunctions, IGenericOperatorFunction>;


export interface IObservable<GValue> {
  subscribe(observer: IObserver<GValue>): IObservableUnsubscribeFunction;

  subscribe(emit: IEmitFunction<GValue>): IObservableUnsubscribeFunction;

  pipe<GFunctions extends IObservablePipeConstraint<GValue, GFunctions>>(
    ...fns: GFunctions
  ): IObservablePipeReturn<GValue, GFunctions>;
}


export type IGenericObservable = IObservable<any>;

export type TInferObservableGValue<GObservable extends IGenericObservable> =
  GObservable extends IObservable<infer GValue>
    ? GValue
    : never;


export class Observable<GValue> implements IObservable<GValue> {
  protected readonly _subscribe: IObservableSubscribeFunction<GValue>;

  constructor(
    subscribe: IObservableSubscribeFunction<GValue>,
  ) {
    this._subscribe = subscribe;
  }

  subscribe(observer: IObserver<GValue>): IObservableUnsubscribeFunction;
  subscribe(emit: IEmitFunction<GValue>): IObservableUnsubscribeFunction;
  subscribe(observerOrEmit: IObserver<GValue> | IEmitFunction<GValue>): IObservableUnsubscribeFunction {
    return this._subscribe(
      (typeof observerOrEmit === 'function')
        ? new Observer<GValue>(observerOrEmit)
        : observerOrEmit
    );
  }

  pipe<GFunctions extends IObservablePipeConstraint<GValue, GFunctions>>(
    ...fns: GFunctions
  ): IObservablePipeReturn<GValue, GFunctions> {
    return pipeNow<IObservable<GValue>, GFunctions, IGenericOperatorFunction>(this, ...fns);
  }
}


export function pipeObservable<GObservable, GFunctions extends PipeConstraint<GFunctions, GObservable, IGenericOperatorFunction>>(
  observable: GObservable,
  ...fns: GFunctions
): PipeNowReturn<GObservable, GFunctions, IGenericOperatorFunction> {
  return pipeNow<GObservable, GFunctions, IGenericOperatorFunction>(observable, ...fns);
}

