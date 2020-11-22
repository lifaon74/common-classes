import { IObservableLike, TInferObservableLikeGObserver } from '../../observable-types';
import {
  TGenericObserverLike, TInferObserverLikeGValue, TObserverEmitFunction
} from '../../../observer/observer-types';
import { IPipeLike } from '../../../pipe/pipe-types';
import { Observer } from '../../../observer/class/observer-class';
import { Pipe } from '../../../pipe/class/pipe-class';
import { Trait } from '@lifaon/traits';
import { TraitObservablePipeTo } from './trait-observable-pipe-to';

@Trait()
export abstract class TraitObservablePipeToUsingPipeToClass<GSelf extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservablePipeTo<GSelf, GObserver> {
  pipeTo<GCallback extends TObserverEmitFunction<TInferObserverLikeGValue<TInferObservableLikeGObserver<GSelf>>>>(this: GSelf, callback: GCallback): IPipeLike<GSelf, TInferObservableLikeGObserver<GSelf>>;
  pipeTo<GArgObserver extends TInferObservableLikeGObserver<GSelf>>(this: GSelf, observer: GArgObserver): IPipeLike<GSelf, GArgObserver>;
  pipeTo(this: GSelf, observerOrCallback: any): IPipeLike<GSelf, TInferObservableLikeGObserver<GSelf>> {
    const observer: TInferObservableLikeGObserver<GSelf> = (typeof observerOrCallback === 'function')
      ? new Observer<any>(observerOrCallback)
      : observerOrCallback;
    return new Pipe<GSelf, TInferObservableLikeGObserver<GSelf>>(this, observer);
  }
}
