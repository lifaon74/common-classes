// import {
//   TGenericObserverLike, TInferObserverLikeGValue, TObserverEmitFunction
// } from '../../../observer/observer-types';
// import { IPipeLike } from '../../../pipe/pipe-types';
// import { Trait } from '@lifaon/traits';
//
// @Trait()
// export abstract class TraitObservablePipeTo<GSelf, GObserver extends TGenericObserverLike> {
//   abstract pipeTo<GCallback extends TObserverEmitFunction<TInferObserverLikeGValue<GObserver>>>(this: GSelf, callback: GCallback): IPipeLike<GSelf, GObserver>;
//   abstract pipeTo<GArgObserver extends GObserver>(this: GSelf, observer: GArgObserver): IPipeLike<GSelf, GArgObserver>;
// }
