import { TGenericObservableLike } from '../../observable/built-in/simple/simple-observable-types';
import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitPipeThroughGetObservable<GSelf, GObservable extends TGenericObservableLike> {
  abstract getObservable(this: GSelf): GObservable;
}
