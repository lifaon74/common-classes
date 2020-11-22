import { IObservableLike } from '../../observable-types';
import {
  TGenericObserverLike, TInferObserverLikeGValue, TObserverEmitFunction
} from '../../../observer/observer-types';
import { IPipeLike } from '../../../pipe/pipe-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservablePipeTo<GSelf extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> {
  abstract pipeTo<GCallback extends TObserverEmitFunction<TInferObserverLikeGValue<GObserver>>>(this: GSelf, callback: GCallback): IPipeLike<GSelf, GObserver>;
  abstract pipeTo<GArgObserver extends GObserver>(this: GSelf, observer: GArgObserver): IPipeLike<GSelf, GArgObserver>;
}
