import { TraitObservableRemoveObserver } from '../../traits/trait-observable-remove-observer';
import { OBSERVABLE_PRIVATE_CONTEXT, TInferObservableStructGObserver } from '../observable-struct';
import { TGenericObserverLike } from '../../../observer/observer-types';
import { TGenericObservableStructWithDispatch } from '../observable-struct-types';
import { Impl } from '@lifaon/traits';

@Impl()
export class ImplTraitRemoveObserverForObservableStruct<GSelf extends TGenericObservableStructWithDispatch> extends TraitObservableRemoveObserver<GSelf, TInferObservableStructGObserver<GSelf>> {
  removeObserver(this: GSelf, observer: TInferObservableStructGObserver<GSelf>): GSelf {
    const observers: TGenericObserverLike[] = this[OBSERVABLE_PRIVATE_CONTEXT].observers;
    const index: number = observers.indexOf(observer);
    if (index === -1) {
      throw new Error(`Doesn't contain this Observer`);
    } else {
      observers.splice(index, 1);
      this.dispatch('remove-observer', observer);
      if (observers.length === 0) {
        this.dispatch('inactive', void 0);
      }
    }
    return this;
  }
}
