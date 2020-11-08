import { TGenericObservableLike } from '../observable/observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitGetObservable<GSelf, GObservable extends TGenericObservableLike> {
  abstract getObservable(this: GSelf): GObservable;
}

export type TInferTraitGetObservableGObservable<GTrait extends TraitGetObservable<any, any>> =
  GTrait extends TraitGetObservable<any, infer GObservable>
    ? GObservable
    : never;
