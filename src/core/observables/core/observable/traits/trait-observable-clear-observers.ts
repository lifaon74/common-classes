import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableClearObservers<GSelf> {
  abstract clearObservers(this: GSelf): GSelf;
}
