import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitAdvancedAbortSignalGetReason<GSelf> {
  abstract getReason(this: GSelf): any;
}


