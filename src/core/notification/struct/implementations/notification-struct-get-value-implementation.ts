import { INotificationStruct, NOTIFICATION_PRIVATE_CONTEXT, } from '../notification-struct';
import { TraitNotificationGetValue } from '../../traits/trait-notification-get-value';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetValueForNotificationStruct<GSelf extends INotificationStruct<any, GValue>, GValue> extends TraitNotificationGetValue<GSelf, GValue> {
  getValue(this: GSelf): GValue {
    return this[NOTIFICATION_PRIVATE_CONTEXT].value;
  }
}
