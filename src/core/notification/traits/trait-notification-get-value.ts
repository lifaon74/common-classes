import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationGetValue<GSelf, GValue> {
  abstract getValue(this: GSelf): GValue;
}

export type TInferTraitNotificationGetValueGValue<GTrait extends TraitNotificationGetValue<any, any>> =
  GTrait extends TraitNotificationGetValue<any, infer GValue>
    ? GValue
    : never;
