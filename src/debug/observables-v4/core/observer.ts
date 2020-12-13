export interface IEmitFunction<GValue> {
  (value: GValue): void;
}

export interface IObserver<GValue> {
  emit(value: GValue): void;
}

export type IGenericObserver = Observer<any>;

export type TInferObserverGValue<GObserver extends IGenericObserver> =
  GObserver extends Observer<infer GValue>
    ? GValue
    : never;


export class Observer<GValue> implements IObserver<GValue> {
  protected readonly _emit: IEmitFunction<GValue>;

  constructor(
    emit: IEmitFunction<GValue>,
  ) {
    this._emit = emit;
  }

  emit(value: GValue): void {
    this._emit(value);
  }
}

