import { INotificationObservableStruct } from './notification-observable-struct';
import { IObservableEventMap } from '../../../../core/observable/observable-types';
import { TInferNotificationObserversFromEventMap } from '../notification-observable-types';
import { TGenericEventMap, TraitEventListenerDispatch } from '@lifaon/traits';

export interface INotificationObservableStructWithDispatch<GEventMap extends TGenericEventMap> extends INotificationObservableStruct<GEventMap>,
  TraitEventListenerDispatch<any, IObservableEventMap<TInferNotificationObserversFromEventMap<GEventMap>>> {
}

export type TGenericNotificationObservableStructWithDispatch = INotificationObservableStructWithDispatch<any>;
