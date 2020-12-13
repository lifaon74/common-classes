import { Trait } from '@lifaon/traits';
import { TGenericObserverLike } from '../../observer/built-in/default/observer-types';


@Trait()
export abstract class TraitTransformGetObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObserver(this: GSelf): GObserver;
}

export type TGenericTraitTransformGetObserver = TraitTransformGetObserver<any, TGenericObserverLike>;
