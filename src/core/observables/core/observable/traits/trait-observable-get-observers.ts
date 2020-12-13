import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableGetObservers<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObservers(this: GSelf): readonly GObserver[]; // TODO return readonly list
}
