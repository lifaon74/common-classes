import { TGenericNotificationObserverLike } from '../../notification-observer/notification-observer-types';
import {
  TInferTraitObservableAddObserverGObserver, TraitObservableAddObserver,
} from '../../../../core/observable/traits/trait-observable-add-observer';
import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitNotificationObservableAddObserver<GSelf, GObserver extends TGenericNotificationObserverLike> extends TraitObservableAddObserver<GSelf, GObserver> {
}

export type TInferTraitNotificationObservableAddObserverGObserver<GTrait extends TraitNotificationObservableAddObserver<any, any>> =
  TInferTraitObservableAddObserverGObserver<GTrait>;
