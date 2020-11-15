import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitAdvancedAbortSignalToAbortController<GSelf> {
  abstract toAbortController(this: GSelf): AbortController;
}

