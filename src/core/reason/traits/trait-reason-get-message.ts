import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitReasonGetMessage<GSelf> {
  abstract getMessage(this: GSelf): string;
}
