import { INotificationObserverLike } from '../notification-observer/notification-observer-types';
import { TraitNotificationObservableAddObserver } from './traits/trait-notification-observable-add-observer';
import { TObservableCreateFunction } from '../../../core/observable/class/observable-class';
import { TGenericEventMap, TraitIsImplementedBy } from '@lifaon/traits';
import { INotificationLike } from '../../../../notification/notification-types';
import { IObservableLike } from '../../../core/observable/observable-types';

export interface INotificationObservableLike<GEventMap extends TGenericEventMap> extends IObservableLike<TInferNotificationObserversFromEventMap<GEventMap>>,
  TraitNotificationObservableAddObserver<any, TInferNotificationObserversFromEventMap<GEventMap>> {
}

export type TGenericNotificationObservableLike = INotificationObservableLike<any>;


export type TInferNotificationObservableLikeGEventMap<GNotificationObservableLike extends TGenericNotificationObservableLike> =
  GNotificationObservableLike extends INotificationObservableLike<infer GEventMap>
    ? GEventMap
    : never;

export function IsNotificationObservableLike<GEventMap extends TGenericEventMap>(value: any): value is INotificationObservableLike<GEventMap> {
  return TraitIsImplementedBy(TraitNotificationObservableAddObserver, value);
}

/** TYPES **/

export type TInferNotificationsFromEventMap<GEventMap extends TGenericEventMap> = {
  [GKey in keyof TGenericEventMap]: GKey extends string
    ? INotificationLike<GKey, TGenericEventMap[GKey]>
    : never;
}[keyof TGenericEventMap];

export type TInferNotificationObserversFromEventMap<GEventMap extends TGenericEventMap> = {
  [GKey in keyof TGenericEventMap]: GKey extends string
    ? INotificationObserverLike<GKey, TGenericEventMap[GKey]>
    : never;
}[keyof TGenericEventMap];


export type TNotificationObservableCreateFunction<GEventMap extends TGenericEventMap> = TObservableCreateFunction<TInferNotificationObserversFromEventMap<GEventMap>>;
