import { TGenericObserverLike } from '../observer/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitGetObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObserver(this: GSelf): GObserver;
}

export type TInferTraitGetObserverGObserver<GTrait extends TraitGetObserver<any, any>> =
  GTrait extends TraitGetObserver<any, infer GObserver>
    ? GObserver
    : never;
