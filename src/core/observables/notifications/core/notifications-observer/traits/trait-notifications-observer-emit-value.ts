import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitNotificationsObserverEmitValue<GSelf, GValue> {
  abstract emitValue(this: GSelf, value: GValue): void;
}

