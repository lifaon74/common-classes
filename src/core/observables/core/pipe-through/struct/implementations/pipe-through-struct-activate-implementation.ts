import { IPipeThroughPrivateContext, IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT, } from '../pipe-through-struct';
import { Impl, TraitActivate } from '@lifaon/traits';
import { TGenericObservableLikeWithEventListenerOnForActiveAndInactive } from '../../pipe-through-types';
import { TGenericPipeLike } from '../../../pipe/pipe-types';
import { TEventListenerOnUnsubscribe } from '@lifaon/traits/src/built-in-traits/event-listener/event-listener-types';


@Impl()
export class ImplTraitActivateForPipeThroughStruct<// generics
  GSelf extends IPipeThroughStruct<TGenericPipeLike, GObservable>,
  GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
//
  > extends TraitActivate<GSelf, GSelf> {
  activate(this: GSelf): GSelf {
    const context: IPipeThroughPrivateContext<TGenericPipeLike, GObservable> = this[PIPE_THROUGH_PRIVATE_CONTEXT];
    if (context.undo === null) {
      const observable: GObservable = context.observable;
      const undoActiveListener: TEventListenerOnUnsubscribe = observable.on('active', () => context.pipe.activate());
      const undoInactiveListener: TEventListenerOnUnsubscribe = observable.on('inactive', () => context.pipe.deactivate());
      context.undo = () => {
        undoActiveListener();
        undoInactiveListener();
      };
      if (observable.isActive()) {
        context.pipe.activate();
      }
    }
    return this;
  }
}
