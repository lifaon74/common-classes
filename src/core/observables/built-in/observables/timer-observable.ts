import {
  IObservable, Observable
} from '../../core/observable/with-events/class/observable-class';
import { IObserverLike } from '../../core/observer/built-in/default/observer-types';
import { TInferObservableEmitFunctionFromObserver } from '../../core/observable/built-in/simple/simple-observable-types';

export class TimerObservable extends Observable<IObserverLike<void>> {
  readonly timeout: number;

  protected _timer: any | null;

  constructor(timeout: number) {
    type GObserver = IObserverLike<void>;

    super((emit: TInferObservableEmitFunctionFromObserver<GObserver>, observable: IObservable<GObserver>) => {
      observable.on('active', () => {
        console.log('start timer');
        this._timer = setInterval(emit, this.timeout);
      });
      observable.on('inactive', () => {
        console.log('clear timer');
        clearInterval(this._timer);
      });
    });
    this.timeout = timeout;
    this._timer = null;
  }
}

