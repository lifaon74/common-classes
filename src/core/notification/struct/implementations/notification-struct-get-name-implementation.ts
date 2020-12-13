import { INotificationStruct, NOTIFICATION_PRIVATE_CONTEXT, } from '../notification-struct';
import { TraitNotificationGetName } from '../../traits/trait-notification-get-name';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetNameForNotificationStruct<GSelf extends INotificationStruct<GName, any>, GName extends string> extends TraitNotificationGetName<GSelf, GName> {
  getName(this: GSelf): GName {
    return this[NOTIFICATION_PRIVATE_CONTEXT].name;
  }
}
