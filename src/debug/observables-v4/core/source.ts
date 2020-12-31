import { IObservable, IObservableUnsubscribeFunction, Observable } from './observable';
import { IObserver } from './observer';
import { noop } from '../misc/helpers/noop';



export interface ISourceOnActive {
  (): void;
}

export interface ISourceOnInactive {
  (): void;
}

export interface ISourceOptions {
  readonly onActive?: ISourceOnActive;
  readonly onInactive?: ISourceOnInactive;
}

export interface ISource<GValue> extends IObservable<GValue>, IObserver<GValue> {

}

export class Source<GValue> extends Observable<GValue> implements ISource<GValue> {

  protected _observers: IObserver<GValue>[];
  protected _isDispatching: boolean;

  constructor(options?: ISourceOptions) {

    let onActive: ISourceOnActive;
    let onInactive: ISourceOnActive;

    if (options === void 0) {
      onActive = noop;
      onInactive = noop;
    } else {
      onActive = (options.onActive === void 0) ? noop : options.onActive;
      onInactive = (options.onInactive === void 0) ? noop : options.onInactive;
    }

    super((observer: IObserver<GValue>): IObservableUnsubscribeFunction => {
      if (this._observers.includes(observer)) {
        throw new Error(`Already subscribed to this Source`);
      } else {
        let running: boolean = true;
        this._cloneObserversIfDispatching();
        this._observers.push(observer);
        if (this._observers.length === 1) {
          onActive();
        }
        return () => {
          if (running) {
            running = false;
            this._cloneObserversIfDispatching();
            this._observers.splice(this._observers.indexOf(observer), 1);
            if (this._observers.length === 0) {
              onInactive();
            }
          }
        };
      }
    });

    this._observers = [];
    this._isDispatching = false;
  }

  emit(value: GValue): void {
    if (this._isDispatching) {
      throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
    } else {
      this._isDispatching = true;
      const observers: IObserver<GValue>[] = this._observers;
      const lengthMinusOne: number = observers.length - 1;
      for (let i = 0; i < lengthMinusOne; i++) {
        observers[i].emit(value);
      }
      this._isDispatching = false;
      observers[lengthMinusOne].emit(value);
    }
  }

  protected _cloneObserversIfDispatching(): void {
    if (this._isDispatching) {
      this._observers = this._observers.slice();
    }
  }
}
