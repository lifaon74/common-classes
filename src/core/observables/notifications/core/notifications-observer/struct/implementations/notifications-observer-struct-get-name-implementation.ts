import { INotificationsObserverStruct, NOTIFICATION_OBSERVER_PRIVATE_CONTEXT, } from '../notifications-observer-struct';
import { TraitNotificationsObserverGetName } from '../../traits/trait-notifications-observer-get-name';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetNameForNotificationsObserverStruct<GSelf extends INotificationsObserverStruct<GName, any>, GName extends string> extends TraitNotificationsObserverGetName<GSelf, GName> {
  getName(this: GSelf): GName {
    return this[NOTIFICATION_OBSERVER_PRIVATE_CONTEXT].name;
  }
}
