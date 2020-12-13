// import {
//   TGenericObserverLike, TInferObserverLikeGValue, TObserverEmitFunction
// } from '../../../observer/observer-types';
// import { IPipeLike } from '../../../pipe/pipe-types';
// import { Observer } from '../../../observer/class/observer-class';
// import { Pipe } from '../../../pipe/class/pipe-class';
// import { Trait } from '@lifaon/traits';
// import { TraitObservablePipeTo } from './trait-observable-pipe-to';
//
// // TODO constraint on GSelf extends ISimpleObservableLike<GObserver>
//
// @Trait()
// export abstract class TraitObservablePipeToUsingPipeToClass<GSelf extends any, GObserver extends TGenericObserverLike> extends TraitObservablePipeTo<GSelf, GObserver> {
//   pipeTo<GCallback extends TObserverEmitFunction<TInferObserverLikeGValue<GObserver>>>(this: GSelf, callback: GCallback): IPipeLike<GSelf, GObserver>;
//   pipeTo<GArgObserver extends GObserver>(this: GSelf, observer: GArgObserver): IPipeLike<GSelf, GArgObserver>;
//   pipeTo(this: GSelf, observerOrCallback: any): IPipeLike<GSelf, GObserver> {
//     const observer: GObserver = (typeof observerOrCallback === 'function')
//       ? new Observer<any>(observerOrCallback)
//       : observerOrCallback;
//     return new Pipe<GSelf, GObserver>(this, observer);
//   }
// }
