import { IObserverLike } from '../../../observer/observer-types';
import { ITransform, Transform } from '../transform-class';
import { IObservable, Observable } from '../../../observable/class/observable-class';
import { IObserver, Observer } from '../../../observer/class/observer-class';

export type TCreateSimpleTransformOutValueFunction<GValueOut> = (value: GValueOut) => void
export type TCreateSimpleTransformInValueFunction<GValueIn, GValueOut> = (value: GValueIn, emit: TCreateSimpleTransformOutValueFunction<GValueOut>) => void

export function CreateSimpleTransform<GValueIn, GValueOut>(
  onEmit: TCreateSimpleTransformInValueFunction<GValueIn, GValueOut>,
): ITransform<IObserver<GValueIn>, IObservable<IObserverLike<GValueOut>>> {
  let observer!: IObserver<GValueIn>;
  const observable: IObservable<IObserverLike<GValueOut>> = new Observable<IObserverLike<GValueOut>>((emit: (value: GValueOut) => void) => {
    observer = new Observer((value: GValueIn) => {
      onEmit(value, emit);
    });
  });
  return new Transform<IObserver<GValueIn>, IObservable<IObserverLike<GValueOut>>>(observer, observable);
}


