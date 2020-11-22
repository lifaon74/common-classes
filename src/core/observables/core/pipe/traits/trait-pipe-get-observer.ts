import { TGenericObserverLike } from '../../observer/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeGetObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObserver(this: GSelf): GObserver;
}

export type TGenericTraitPipeGetObserver = TraitPipeGetObserver<any, TGenericObserverLike>;

