import {
  IPipeThroughPrivateContext, IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT, TGenericPipeThroughStruct,
} from '../pipe-through-struct';
import { TGenericObservableLike } from '../../../observable/observable-types';
import { ITransformLike } from '../../../transform/transform-types';
import { TGenericObserverLike } from '../../../observer/observer-types';
import { Impl, TraitActivate, TraitEventListenerOn } from '@lifaon/traits';

export interface TImplTraitActivateForPipeThroughStructGSelfConstraint<GSelf extends TGenericPipeThroughStruct> extends IPipeThroughStruct<TGenericObservableLike, TGenericTransformWithObservableHavingEventListenerOn> {

}

type TGenericTransformWithObservableHavingEventListenerOn = ITransformLike<TGenericObserverLike, TGenericObservableLikeWithEventListenerOn>;

interface TGenericObservableLikeWithEventListenerOnEventMap {
  'active': void;
  'inactive': void;
}

export interface TGenericObservableLikeWithEventListenerOn extends TGenericObservableLike, TraitEventListenerOn<any, TGenericObservableLikeWithEventListenerOnEventMap> {
}

@Impl()
export class ImplTraitActivateForPipeThroughStruct<GSelf extends TImplTraitActivateForPipeThroughStructGSelfConstraint<GSelf>> extends TraitActivate<GSelf, GSelf> {
  activate(this: GSelf): GSelf {
    const context: IPipeThroughPrivateContext<TGenericObservableLike, TGenericTransformWithObservableHavingEventListenerOn> = this[PIPE_THROUGH_PRIVATE_CONTEXT];
    if (context.undo === null) {
      const undoActiveListener = context.observable.on('active', () => context.pipe.activate());
      const undoInactiveListener = context.observable.on('inactive', () => context.pipe.deactivate());
      context.undo = () => {
        undoActiveListener();
        undoInactiveListener();
      };
      if (context.observable.isActive()) {
        context.pipe.activate();
      }
    }
    return this;
  }
}
