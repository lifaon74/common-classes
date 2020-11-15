import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitAdvancedAbortSignalIsAborted<GSelf> {
  abstract isAborted(this: GSelf): boolean;
}


