import { IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT, } from '../observable-struct';
import { TraitObservableGetObservers } from '../../traits/trait-observable-get-observers';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../observer/observer-types';


@Impl()
export class ImplTraitGetObserversForObservableStruct<GSelf extends IObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableGetObservers<GSelf, GObserver> {
  getObservers(this: GSelf): readonly GObserver[] {
    return Object.freeze(this[OBSERVABLE_PRIVATE_CONTEXT].observers.slice(0));
  }
}


