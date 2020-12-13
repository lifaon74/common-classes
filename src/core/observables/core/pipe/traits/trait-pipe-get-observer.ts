import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeGetObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObserver(this: GSelf): GObserver;
}

export type TGenericTraitPipeGetObserver = TraitPipeGetObserver<any, TGenericObserverLike>;

