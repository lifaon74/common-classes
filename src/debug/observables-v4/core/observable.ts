import { IEmitFunction, IObserver, Observer } from './observer';

export interface IObservableSubscribeFunction<GValue> {
  (observer: IObserver<GValue>): IObservableUnsubscribeFunction;
}

export interface IObservableUnsubscribeFunction {
  (): void;
}

export interface IObservable<GValue> {
  subscribe(observer: IObserver<GValue>): IObservableUnsubscribeFunction;

  subscribe(emit: IEmitFunction<GValue>): IObservableUnsubscribeFunction;
}


export type IGenericObservable = Observable<any>;

export type TInferObservableGValue<GObservable extends IGenericObservable> =
  GObservable extends Observable<infer GValue>
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
}


