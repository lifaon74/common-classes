import {
  NOTIFICATION_PRIVATE_CONTEXT, TGenericNotificationStruct, TInferNotificationStructGValue,
} from '../notification-struct';
import { TraitNotificationGetValue } from '../../traits/trait-notification-get-value';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetValueForNotificationStruct<GSelf extends TGenericNotificationStruct> extends TraitNotificationGetValue<GSelf, TInferNotificationStructGValue<GSelf>> {
  getValue(this: GSelf): TInferNotificationStructGValue<GSelf> {
    return this[NOTIFICATION_PRIVATE_CONTEXT].value;
  }
}
