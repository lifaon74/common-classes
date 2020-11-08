import { INotificationObserverLike } from '../notification-observer/notification-observer-types';
import { TraitNotificationObservableAddObserver } from './traits/trait-notification-observable-add-observer';
import { TObservableCreateFunction } from '../../../core/observable/class/observable-class';
import { TEventMap, TraitIsImplementedBy } from '@lifaon/traits';
import { INotificationLike } from '../../../../notification/notification-types';
import { IObservableLike } from '../../../core/observable/observable-types';

export interface INotificationObservableLike<GEventMap extends TEventMap> extends IObservableLike<TInferNotificationObserversFromEventMap<GEventMap>>,
  TraitNotificationObservableAddObserver<any, TInferNotificationObserversFromEventMap<GEventMap>> {
}

export type TGenericNotificationObservableLike = INotificationObservableLike<any>;


export type TInferNotificationObservableLikeGEventMap<GNotificationObservableLike extends TGenericNotificationObservableLike> =
  GNotificationObservableLike extends INotificationObservableLike<infer GEventMap>
    ? GEventMap
    : never;

export function IsNotificationObservableLike<GEventMap extends TEventMap>(value: any): value is INotificationObservableLike<GEventMap> {
  return TraitIsImplementedBy(TraitNotificationObservableAddObserver, value);
}

/** TYPES **/

export type TInferNotificationsFromEventMap<GEventMap extends TEventMap> = {
  [GKey in keyof TEventMap]: GKey extends string
    ? INotificationLike<GKey, TEventMap[GKey]>
    : never;
}[keyof TEventMap];

export type TInferNotificationObserversFromEventMap<GEventMap extends TEventMap> = {
  [GKey in keyof TEventMap]: GKey extends string
    ? INotificationObserverLike<GKey, TEventMap[GKey]>
    : never;
}[keyof TEventMap];


export type TNotificationObservableCreateFunction<GEventMap extends TEventMap> = TObservableCreateFunction<TInferNotificationObserversFromEventMap<GEventMap>>;
