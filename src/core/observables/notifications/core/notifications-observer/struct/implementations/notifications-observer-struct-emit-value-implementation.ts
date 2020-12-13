import { INotificationsObserverStruct, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT, } from '../notifications-observer-struct';
import { Impl } from '@lifaon/traits';
import { TraitNotificationsObserverEmitValue } from '../../traits/trait-notifications-observer-emit-value';


@Impl()
export class ImplTraitEmitValueForNotificationsObserverStruct<GSelf extends INotificationsObserverStruct<string, GValue>, GValue> extends TraitNotificationsObserverEmitValue<GSelf, GValue> {
  emitValue(this: GSelf, value: GValue): void {
    this[NOTIFICATION_OBSERVER_PRIVATE_CONTEXT].emitValue(value);
  }
}
