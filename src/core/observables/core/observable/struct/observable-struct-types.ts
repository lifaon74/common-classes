import { IObservableStruct } from './observable-struct';
import { IObservableEventMap } from '../observable-types';
import { TGenericObserverLike } from '../../observer/observer-types';
import { TraitEventListenerDispatch } from '@lifaon/traits';

export interface IObservableStructWithDispatch<GObserver extends TGenericObserverLike> extends IObservableStruct<GObserver>,
  TraitEventListenerDispatch<any, IObservableEventMap<GObserver>> {
}

export type TGenericObservableStructWithDispatch = IObservableStructWithDispatch<any>;
