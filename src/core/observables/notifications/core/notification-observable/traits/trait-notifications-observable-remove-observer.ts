import { TGenericNotificationsObserverLike } from '../../notifications-observer/notifications-observer-types';
import { Trait } from '@lifaon/traits';
import { TraitObservableRemoveObserver } from '../../../../core/observable/traits/trait-observable-remove-observer';


@Trait()
export abstract class TraitNotificationsObservableRemoveObserver<GSelf, GObserver extends TGenericNotificationsObserverLike> extends TraitObservableRemoveObserver<GSelf, GObserver> {
}

