import { INotificationObservableStruct } from './notification-observable-struct';
import { IObservableEventMap } from '../../../../core/observable/observable-types';
import { TInferNotificationObserversFromEventMap } from '../notification-observable-types';
import { TEventMap, TraitEventListenerDispatch } from '@lifaon/traits';

export interface INotificationObservableStructWithDispatch<GEventMap extends TEventMap> extends INotificationObservableStruct<GEventMap>,
  TraitEventListenerDispatch<any, IObservableEventMap<TInferNotificationObserversFromEventMap<GEventMap>>> {
}

export type TGenericNotificationObservableStructWithDispatch = INotificationObservableStructWithDispatch<any>;
