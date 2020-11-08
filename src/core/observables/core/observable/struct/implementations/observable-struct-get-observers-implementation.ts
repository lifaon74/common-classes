import {
  OBSERVABLE_PRIVATE_CONTEXT, TGenericObservableStruct, TInferObservableStructGObserver,
} from '../observable-struct';
import { TraitObservableGetObservers } from '../../traits/trait-observable-get-observers';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetObserversForObservableStruct<GSelf extends TGenericObservableStruct> extends TraitObservableGetObservers<GSelf, TInferObservableStructGObserver<GSelf>> {
  getObservers(this: GSelf): readonly TInferObservableStructGObserver<GSelf>[] {
    return Object.freeze(this[OBSERVABLE_PRIVATE_CONTEXT].observers.slice(0));
  }
}


