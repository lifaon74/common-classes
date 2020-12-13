import { ISimpleObservableStruct, SIMPLE_OBSERVABLE_PRIVATE_CONTEXT, } from '../simple-observable-struct';
import { Impl } from '@lifaon/traits';
import { TGenericObserverLike } from '../../../../../observer/built-in/default/observer-types';
import { TraitObservableGetObservers } from '../../../../traits/trait-observable-get-observers';


@Impl()
export class ImplTraitGetObserversForSimpleObservableStruct<GSelf extends ISimpleObservableStruct<GObserver>, GObserver extends TGenericObserverLike> extends TraitObservableGetObservers<GSelf, GObserver> {
  getObservers(this: GSelf): readonly GObserver[] {
    return Object.freeze(this[SIMPLE_OBSERVABLE_PRIVATE_CONTEXT].observers.slice(0));
  }
}


