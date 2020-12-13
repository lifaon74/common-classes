import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableAddObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract addObserver(this: GSelf, observer: GObserver): GSelf;
}
