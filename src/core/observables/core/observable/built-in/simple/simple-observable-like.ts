import { TGenericObserverLike } from '../../../observer/built-in/default/observer-types';
import { TraitObservableAddObserver, } from '../../traits/trait-observable-add-observer';
import { TraitObservableRemoveObserver } from '../../traits/trait-observable-remove-observer';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface ISimpleObservableLike<GObserver extends TGenericObserverLike> extends
  // traits
  TraitObservableAddObserver<any, GObserver>,
  TraitObservableRemoveObserver<any, GObserver>
  //
{
}

export function IsSimpleObservableLike<GObserver extends TGenericObserverLike>(value: any): value is ISimpleObservableLike<GObserver> {
  return TraitIsImplementedBy(TraitObservableAddObserver, value)
    && TraitIsImplementedBy(TraitObservableRemoveObserver, value);
}
