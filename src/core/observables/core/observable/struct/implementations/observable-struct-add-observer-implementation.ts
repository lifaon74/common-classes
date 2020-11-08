import { OBSERVABLE_PRIVATE_CONTEXT, TInferObservableStructGObserver } from '../observable-struct';
import { TraitObservableAddObserver } from '../../traits/trait-observable-add-observer';
import { IsObserverLike, TGenericObserverLike } from '../../../observer/observer-types';
import { TGenericObservableStructWithDispatch } from '../observable-struct-types';
import { Impl } from '@lifaon/traits';

// export function AddObserverToObserversListOfObservableStruct<GSelf extends TGenericObservableStructWithDispatch>(
//   instance: GSelf,
//   observer: TInferObservableStructGObserver<GSelf>,
// ): void {
//   const observers: TGenericObserverLike[] = instance[OBSERVABLE_PRIVATE_CONTEXT].observers;
//   if (observers.includes(observer)) {
//     throw new Error(`Observer already in the list`);
//   } else {
//     observers.push(observer);
//     instance.dispatch('add-observer', observer);
//     if (observers.length === 1) {
//       instance.dispatch('active', void 0);
//     }
//   }
// }

@Impl()
export class ImplTraitAddObserverForObservableStruct<GSelf extends TGenericObservableStructWithDispatch> extends TraitObservableAddObserver<GSelf, TInferObservableStructGObserver<GSelf>> {
  addObserver(this: GSelf, observer: TInferObservableStructGObserver<GSelf>): GSelf {
    if (IsObserverLike(observer)) {
      // AddObserverToObserversListOfObservableStruct<GSelf>(this, observer);
      const observers: TGenericObserverLike[] = this[OBSERVABLE_PRIVATE_CONTEXT].observers;
      if (observers.includes(observer)) {
        observers.push(observer);
        this.dispatch('add-observer', observer);
        if (observers.length === 1) {
          this.dispatch('active', void 0);
        }
      }
      return this;
    } else {
      throw new TypeError(`Not an Observer`);
    }
  }
}
