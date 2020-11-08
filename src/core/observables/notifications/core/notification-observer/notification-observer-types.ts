import {
  TInferTraitNotificationObserverGetNameGName, TraitNotificationObserverGetName,
} from './traits/trait-notification-observer-get-name';
import { IObserverLike, IsObserverLike } from '../../../core/observer/observer-types';
import { INotificationLike } from '../../../../notification/notification-types';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface INotificationObserverLike<GName extends string, GValue> extends IObserverLike<INotificationLike<GName, GValue>>,
  TraitNotificationObserverGetName<any, GName> {
}

export type TGenericNotificationObserverLike = INotificationObserverLike<any, any>;

export type TInferNotificationObserverLikeGName<GNotificationObserverLike extends TGenericNotificationObserverLike> = TInferTraitNotificationObserverGetNameGName<GNotificationObserverLike>;

export type TInferNotificationObserverLikeGValue<GNotificationObserverLike extends TGenericNotificationObserverLike> =
  GNotificationObserverLike extends INotificationObserverLike<any, infer GValue>
    ? GValue
    : never;

export function IsNotificationObserverLike<GName extends string, GValue>(value: any): value is INotificationObserverLike<GName, GValue> {
  return IsObserverLike<INotificationLike<GName, GValue>>(value)
    && TraitIsImplementedBy(TraitNotificationObserverGetName, value);
}

/** TYPES **/

export type TNotificationObserverCallback<GName extends string, GValue> = (value: INotificationLike<GName, GValue>) => void;


