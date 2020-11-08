import {
  NOTIFICATION_PRIVATE_CONTEXT, TGenericNotificationStruct, TInferNotificationStructGName,
} from '../notification-struct';
import { TraitNotificationGetName } from '../../traits/trait-notification-get-name';
import { Impl } from '@lifaon/traits';


@Impl()
export class ImplTraitGetNameForNotificationStruct<GSelf extends TGenericNotificationStruct> extends TraitNotificationGetName<GSelf, TInferNotificationStructGName<GSelf>> {
  getName(this: GSelf): TInferNotificationStructGName<GSelf> {
    return this[NOTIFICATION_PRIVATE_CONTEXT].name;
  }
}
