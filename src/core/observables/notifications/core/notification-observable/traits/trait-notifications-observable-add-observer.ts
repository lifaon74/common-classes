import { TGenericNotificationsObserverLike } from '../../notifications-observer/notifications-observer-types';
import { TraitObservableAddObserver, } from '../../../../core/observable/traits/trait-observable-add-observer';
import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitNotificationsObservableAddObserver<GSelf, GObserver extends TGenericNotificationsObserverLike> extends TraitObservableAddObserver<GSelf, GObserver> {
}

