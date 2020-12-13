import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationsObserverGetName<GSelf, GName extends string> {
  abstract getName(this: GSelf): GName;
}

// export type TInferTraitNotificationsObserverGetNameGName<GTrait extends TraitNotificationsObserverGetName<any, any>> =
//   GTrait extends TraitNotificationsObserverGetName<any, infer GName>
//     ? GName
//     : never;
