import { TGenericObservableLike, TInferObservableLikeGObserver } from '../observable-types';
import { TInferObserverLikeGValue, TObserverEmitFunction } from '../../observer/observer-types';
import { IPipeLike } from '../../pipe/pipe-types';
import { Observer } from '../../observer/class/observer-class';
import { Pipe } from '../../pipe/class/pipe-class';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservablePipeTo<GSelf extends TGenericObservableLike> {
  pipeTo<GCallback extends TObserverEmitFunction<TInferObserverLikeGValue<TInferObservableLikeGObserver<GSelf>>>>(this: GSelf, callback: GCallback): IPipeLike<GSelf, TInferObservableLikeGObserver<GSelf>>;
  pipeTo<GArgObserver extends TInferObservableLikeGObserver<GSelf>>(this: GSelf, observer: GArgObserver): IPipeLike<GSelf, GArgObserver>;
  pipeTo(this: GSelf, observerOrCallback: any): IPipeLike<GSelf, TInferObservableLikeGObserver<GSelf>> {
    const observer: TInferObservableLikeGObserver<GSelf> = (typeof observerOrCallback === 'function')
      ? new Observer<any>(observerOrCallback)
      : observerOrCallback;
    return new Pipe<GSelf, TInferObservableLikeGObserver<GSelf>>(this, observer);
  }
}
