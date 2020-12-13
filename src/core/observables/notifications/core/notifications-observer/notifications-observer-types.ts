import { TraitNotificationsObserverGetName, } from './traits/trait-notifications-observer-get-name';
import { IObserverLike, IsObserverLike } from '../../../core/observer/built-in/default/observer-types';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { INotificationLike } from '../../../../notification/notification-types';
import { TraitNotificationsObserverEmitValue } from './traits/trait-notifications-observer-emit-value';

export interface INotificationsObserverLike<GName extends string, GValue> extends
  // observer traits
  IObserverLike<INotificationLike<GName, GValue>>,
  // own traits
  TraitNotificationsObserverGetName<any, GName>,
  TraitNotificationsObserverEmitValue<any, GValue>
  //
{
}

export type TGenericNotificationsObserverLike = INotificationsObserverLike<string, any>;

// export type TInferNotificationsObserverLikeGName<GNotificationsObserverLike extends TGenericNotificationsObserverLike> = TInferTraitNotificationsObserverGetNameGName<GNotificationsObserverLike>;
//
// export type TInferNotificationsObserverLikeGValue<GNotificationsObserverLike extends TGenericNotificationsObserverLike> =
//   GNotificationsObserverLike extends INotificationsObserverLike<any, infer GValue>
//     ? GValue
//     : never;

export function IsNotificationsObserverLike<GName extends string, GValue>(value: any): value is INotificationsObserverLike<GName, GValue> {
  return IsObserverLike<INotificationLike<GName, GValue>>(value)
    && TraitIsImplementedBy(TraitNotificationsObserverGetName, value)
    && TraitIsImplementedBy(TraitNotificationsObserverEmitValue, value);
}

/** TYPES **/

// export type TNotificationsObserverCallback<GName extends string, GValue> = (value: INotificationLike<GName, GValue>) => void;
export type TNotificationsObserverCallback<GValue> = (value: GValue) => void;


