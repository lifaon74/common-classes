import { TInferTraitNotificationGetNameGName, TraitNotificationGetName } from './traits/trait-notification-get-name';
import {
  TInferTraitNotificationGetValueGValue, TraitNotificationGetValue,
} from './traits/trait-notification-get-value';
import { TraitIsImplementedBy } from '@lifaon/traits';

export interface INotificationLike<GName extends string, GValue> extends TraitNotificationGetName<any, GName>,
  TraitNotificationGetValue<any, GValue> {
}

export type TGenericNotificationLike = INotificationLike<any, any>;

export type TInferNotificationLikeGName<GNotificationLike extends TGenericNotificationLike> = TInferTraitNotificationGetNameGName<GNotificationLike>;
export type TInferNotificationLikeGValue<GNotificationLike extends TGenericNotificationLike> = TInferTraitNotificationGetValueGValue<GNotificationLike>;

export function IsNotificationLike<GName extends string, GValue>(value: any): value is INotificationLike<GName, GValue> {
  return TraitIsImplementedBy(TraitNotificationGetName, value)
    && TraitIsImplementedBy(TraitNotificationGetValue, value);
}
