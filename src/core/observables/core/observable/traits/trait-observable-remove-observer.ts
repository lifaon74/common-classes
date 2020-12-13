import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableRemoveObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract removeObserver(this: GSelf, observer: GObserver): GSelf
}

