import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationGetValue<GSelf, GValue> {
  abstract getValue(this: GSelf): GValue;
}

export type TGenericTraitNotificationGetValue = TraitNotificationGetValue<any, any>;

export type TInferTraitNotificationGetValueGValue<GTrait extends TGenericTraitNotificationGetValue> =
  GTrait extends TraitNotificationGetValue<any, infer GValue>
    ? GValue
    : never;
