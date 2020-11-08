import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitObservableIsActive<GSelf> {
  abstract isActive(this: GSelf): boolean;
}
