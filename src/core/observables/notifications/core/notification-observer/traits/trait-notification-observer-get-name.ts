import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationObserverGetName<GSelf, GName extends string> {
  abstract getName(this: GSelf): GName;
}

export type TInferTraitNotificationObserverGetNameGName<GTrait extends TraitNotificationObserverGetName<any, any>> =
  GTrait extends TraitNotificationObserverGetName<any, infer GName>
    ? GName
    : never;
