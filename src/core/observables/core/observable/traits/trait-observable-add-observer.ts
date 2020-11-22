import { TGenericObserverLike } from '../../observer/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableAddObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract addObserver(this: GSelf, observer: GObserver): GSelf;
}

export type TGenericTraitObservableAddObserver = TraitObservableAddObserver<any, any>;

