import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitAdvancedAbortControllerAbort<GSelf> {
  abstract abort(this: GSelf, reason?: any): void;
}

