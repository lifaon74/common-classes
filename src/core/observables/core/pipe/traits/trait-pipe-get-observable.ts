import { TGenericObservableLike } from '../../observable/observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeGetObservable<GSelf, GObservable extends TGenericObservableLike> {
  abstract getObservable(this: GSelf): GObservable;
}

export type TGenericTraitPipeGetObservable = TraitPipeGetObservable<any, TGenericObservableLike>;

