import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationGetName<GSelf, GName extends string> {
  abstract getName(this: GSelf): GName;
}

export type TInferTraitNotificationGetNameGName<GTrait extends TraitNotificationGetName<any, any>> =
  GTrait extends TraitNotificationGetName<any, infer GName>
    ? GName
    : never;
