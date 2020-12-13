import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationGetName<GSelf, GName extends string> {
  abstract getName(this: GSelf): GName;
}

export type TGenericTraitNotificationGetName = TraitNotificationGetName<any, any>;

export type TInferTraitNotificationGetNameGName<GTrait extends TGenericTraitNotificationGetName> =
  GTrait extends TraitNotificationGetName<any, infer GName>
    ? GName
    : never;
