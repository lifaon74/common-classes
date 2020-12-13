import { TGenericObservableLike } from '../../observable/built-in/simple/simple-observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitTransformGetObservable<GSelf, GObservable extends TGenericObservableLike> {
  abstract getObservable(this: GSelf): GObservable;
}

export type TGenericTraitTransformGetObservable = TraitTransformGetObservable<any, TGenericObservableLike>;


